import unittest
import time

from server.devices.base import BaseEnvironment
from server.forecasting.simulation.devices.consumers import SimulatedThermalConsumer
from server.forecasting.simulation.devices.storages import SimulatedHeatStorage


class SimulatedThermalConsumerTests(unittest.TestCase):

    def setUp(self):
        env = BaseEnvironment(forecast=True)
        self.consumer = SimulatedThermalConsumer(0, env)
        self.consumer.heat_storage = SimulatedHeatStorage(1, env)

    def test_get_warmwater_consumption_power(self):
        ''' number of residents.
        consumption dependent from week and weekend
        .. and a consumer class own interpolation method.
        '''
        # self.consumer.config['residents']
        # current time aka self.env.now
        # self.consumer.temperature_warmwater
        # heat_storage.config['base_temperature']

    def test_get_warmwater_consumption_power_considers_heat_storage_base(self):
        '''
        the result should be depending on the base temperature of the
        heate storage.
        '''
        base_temperature = 15
        first_result = self.get_warmwater_consumption_power_with_parameters(
            residents=22,
            time_in_seconds=10,
            temperature=20,
            heat_storage_base=base_temperature)

        base_temperature = 20
        second_result = self.get_warmwater_consumption_power_with_parameters(
            residents=22,
            time_in_seconds=10,
            temperature=20,
            heat_storage_base=base_temperature)
        self.assertNotEqual(first_result, second_result,
                            "changed base temperature of heat storage didn't result in different warmwater powers.")

    def test_get_warmwater_consumption_power_considers_residents(self):
        '''
        the result should be depending on the base temperature of the
        heate storage.
        '''
        residents = 15
        first_result = self.get_warmwater_consumption_power_with_parameters(
            residents=residents,
            time_in_seconds=10,
            temperature=20,
            heat_storage_base=15)

        residents = 20
        second_result = self.get_warmwater_consumption_power_with_parameters(
            residents=residents,
            time_in_seconds=10,
            temperature=20,
            heat_storage_base=15)
        self.assertNotEqual(first_result, second_result,
                            "changed number of residents storage didn't result in different warmwater powers.")

    def get_warmwater_consumption_power_with_parameters(self, residents=0,
                                                        time_in_seconds=10, temperature=20, heat_storage_base=15):
        ''' the result depends on the number of residents,
        the current time aka self.env.now
        the temperature of warm water and 
        the base_temperatur of the heat_storage'''
        self.consumer.config['residents'] = residents
        env = BaseEnvironment(initial_time=time_in_seconds, forecast=True)
        self.consumer.env = env
        self.consumer.temperature_warmwater = temperature

        heat_storage = SimulatedHeatStorage(0, env)
        heat_storage.base_temperature = heat_storage_base
        self.consumer.heat_storage = heat_storage

        return self.consumer.get_warmwater_consumption_power()

    def test_simulate_consumption_increase_current_power(self):
        '''the current_power should be increased if the current temperature 
        is below the target temperature'''
        self.consumer.temperature_room = 0
        self.consumer.config['target_temperature'] = 30
        last_current_power = 20
        self.consumer.current_power = last_current_power

        self.consumer.simulate_consumption()

        self.assertGreater(self.consumer.current_power, last_current_power)

    def test_simulate_consumption_decrease_current_power(self):
        '''Current_power is the new power, it determines the energy-consumption
        the current_power should be decreased if the current temperature 
        is below the target temperature'''
        self.consumer.temperature_room = 30
        self.consumer.config['target_temperature'] = 0
        last_current_power = 20
        self.consumer.current_power = last_current_power

        self.consumer.simulate_consumption()

        self.assertLess(self.consumer.current_power, last_current_power)

    def test_simulate_consumption_current_power(self):
        ''' self.current_power is the power, depending on the desired power
        and _the cooling of the room.
        current_power is the last ideal power reduced by the energyloss of a room 
        it determines the actual temperature in the room.
        '''
        last_current_power = 20
        self.consumer.current_power = last_current_power

        self.consumer.simulate_consumption()

        self.assertNotEqual(self.consumer.current_power, last_current_power)
        self.assertLessEqual(
            self.consumer.current_power, self.consumer.max_power)
        self.assertGreaterEqual(self.consumer.current_power, 0)

    def test_heat_room_considers_current_power(self):
        ''' The room_temperature depends on
        the current_power,
        the passed time between the steps and the
        room_temperature. If one of the parameter is changed, 
        the temperature will change.'''

        first_result = self.heat_room_with_parameters(
            current_power=2000, step_size=120, temperature=20)
        second_result = self.heat_room_with_parameters(
            current_power=200000, step_size=120, temperature=20)
        self.assertNotEqual(first_result, second_result)

    def test_heat_room_considers_step_size(self):
        ''' The room_temperature depends on
        the current_power,
        the passed time between the steps and the
        room_temperature. If one of the parameter is changed, 
        the temperature will change.'''

        first_result = self.heat_room_with_parameters(
            current_power=2000, step_size=120, temperature=20)
        second_result = self.heat_room_with_parameters(
            current_power=2000, step_size=200, temperature=20)
        self.assertNotEqual(first_result, second_result)

    def test_heat_room_considers_room_temperature(self):
        ''' The room_temperature depends on
        the current_power,
        the passed time between the steps and the
        room_temperature. If one of the parameter is changed, 
        the temperature will change.'''

        first_result = self.heat_room_with_parameters(
            current_power=2000, step_size=120, temperature=20)
        second_result = self.heat_room_with_parameters(
            current_power=2000, step_size=120, temperature=30)
        self.assertNotEqual(first_result, second_result)

    def heat_room_with_parameters(self, current_power, step_size, temperature):
        self.consumer.current_power = current_power
        self.consumer.env.step_size = step_size
        self.consumer.temperature_room = temperature
        for i in range(1, 10):
            # self.consumer.heat_room()
            self.consumer.simulate_consumption()
        return self.consumer.temperature_room

    def test_target_temperature_simulate_consumption(self):
        '''the target temperature of the consumer should be set
        according to the daily demand'''
        daily_demand = [x for x in range(24)]

        env = BaseEnvironment(initial_time=1388530800,
                              forecast=True)  # 2014-01-01 00:00:00
        heat_storage = SimulatedHeatStorage(0, env)
        consumer = SimulatedThermalConsumer(1, env)
        consumer.heat_storage = heat_storage
        consumer.daily_demand = daily_demand

        for index, temperature in enumerate(daily_demand):
            consumer.config['target_temperature'] = 0
            consumer.simulate_consumption()

            self.assertEqual(
                consumer.config['target_temperature'], temperature,
                "current hour: {0} expected: {1} got: {2}".format(
                    index, consumer.config['target_temperature'],
                    temperature))

            env.now += 60 * 60

        '''def test_heat_room(self):
        # sets the room_temperature with respect to
        # the current temperature,
        # the heat_capacity       
        # the current power (consuption) of the room'''
