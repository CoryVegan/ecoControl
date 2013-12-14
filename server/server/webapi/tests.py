import unittest
import json
from django.test import Client
from django.contrib.auth.models import User

from server.models import Device

from functions import save_device_data
from helpers import extract_data

class SimpleTest(unittest.TestCase):
    @classmethod  
    def setUpClass(cls): 
        # Create test user for all tests
        User.objects.create_user(username = "test_user", password = "demo123", first_name="test_fn", last_name="test_ln")

        # Add test device
        Device.objects.create(name="test_name", interval=60)

    def setUp(self):
        # Every test needs a client.
        self.client = Client()

    def test_login_inactive(self):
        # Issue a GET request.
        response = self.client.get('/api/status/')

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)

        # Check that the response equals {"login": "inactive"}
        self.assertEqual(json.loads(response.content), {"login": "inactive"})

    def test_login_procedure(self):
        # Issue a POST request.
        response = self.client.post('/api/login/', {'username': 'test_user', 'password': 'demo123'})

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)

        # Check that the response equals {"login": "active"}
        self.assertEqual(json.loads(response.content), {"login": "successful", "user": "test_fn test_ln"})

        # Issue a GET request.
        response = self.client.get('/api/status/')

        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)

        # Check that the response equals {"login": "inactive"}
        self.assertEqual(json.loads(response.content), {"login": "active", "user": "test_fn test_ln"})

    def test_permission_denied(self):
        # test multipe protected urls
        for url in ['/api/devices/', '/api/device/1/actuators/', '/api/device/1/sensors/', '/api/device/1/entries/', '/api/device/1/', '/api/sensor/1/', '/api/entry/1/']:
            response = self.client.get(url)
            self.assertEqual(response.status_code, 403) 

    def test_add_device(self):
        # Log in client
        self.client.login(username='test_user', password='demo123')

        # Issue GET request for device details
        d = Device.objects.get(name="test_name")
        response = self.client.get('/api/device/' + str(d.id) + '/')

        # Check that the response contains the test device
        self.assertEqual(json.loads(response.content), [{"id": d.id, "name": d.name, "interval": d.interval}])

    # def test_save_device_data(self):
    #     self.client.login(username='test_user', password='demo123')
    #     response = self.client.post('/api/device/1/', {'data': json.dumps({"test_sensor": 14.5})})

    def test_extract_data(self):
        # Prepare test dictionary
        test_data = {
            'a': 1,
            'c': 9,
            'f': {
                's': 'foo',
                't': 'bar',
                'r': {
                    'foo': 'bar2'
                },
            },
            'z': 'foo1',
        }

        # Check various combinations
        self.assertEqual(extract_data(test_data,"a"), 1)
        self.assertEqual(extract_data(test_data,"f/s"), 'foo')
        self.assertEqual(extract_data(test_data,"f/{2}"), 'bar')
        self.assertEqual(extract_data(test_data,"f/r/foo"), 'bar2')
        self.assertEqual(extract_data(test_data,"z"), 'foo1')

        # Check that extract_data return '' if key not found or any other error
        self.assertEqual(extract_data(test_data,"r/s/t"), '')
        self.assertEqual(extract_data(test_data,"//"), '')
        