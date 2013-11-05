#!/usr/bin/env python

import sys
sys.path.insert(0, '..')

from app import app, db
from models import *
from views import *

if __name__ == '__main__':
    app.run(host="0.0.0.0")