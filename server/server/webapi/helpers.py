import json
import logging
import pytz

from django.http import HttpResponse
from django.contrib.auth.models import Group
from django.core import serializers
from django.core.exceptions import PermissionDenied

logger = logging.getLogger('webapi')

class WebAPIEncoder(json.JSONEncoder):
    def default(self, obj):
        import calendar, datetime
        # Support datetime instances
        if isinstance(obj, datetime.datetime):
            if obj.utcoffset() is not None:
                obj = obj - obj.utcoffset()
            obj = pytz.timezone('CET').localize(obj)
            milliseconds = int(
                calendar.timegm(obj.timetuple()) * 1000 +
                obj.microsecond / 1000
            )
            return milliseconds

        return json.JSONEncoder.default(self, obj)

def create_json_response(request, data):
    if 'callback' in request.GET:
        response = HttpResponse(
            "%s(%s);" % (request.GET['callback'], json.dumps(data, cls=WebAPIEncoder)),
            content_type='application/json'
        )
    else:
        response = HttpResponse(json.dumps(data, cls=WebAPIEncoder), content_type='application/json')
    return response

def create_json_response_from_QuerySet(request, data):
    return create_json_response(request, list(data.values()))

def is_in_group(user, group_id):
    """
    Takes a user and a group id, and returns `True` if the user is in that group.
    """
    try:
        return Group.objects.get(id=group_id).user_set.filter(id=user.id).exists()
    except Group.DoesNotExist:
        logger.warning("Group #%s does not exsist." % group_id)

def extract_data(dictionary, path):
    """
    Returns dictionary[a].values()[2][c] if path="a/{2}/c"
    """
    for item in path.split("/"):
        try:
            if item[:1]=="{" and item[-1:]=="}":
                dictionary = dictionary.values()[int(item[1:-1])]
            else:
                dictionary = dictionary[item]
        except:
            return ""
    return dictionary

def check_user_permissions(request):
    if not request.user.is_authenticated():
        raise PermissionDenied
    