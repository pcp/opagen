#!/usr/bin/env python
# vim: set fileencoding=<UTF-8> :
''' This script scrapes all raw files from path and write it to js file as an javascript array.
'''

__author__ = 'Patric Pendelin'
__copyright__ = 'Copyright 2013, Patric Pendelin'
__credits__ = ['Patric Pendelin']
__license__ = "LGPL"
__version_info__ = ('0', '1', '0')
__version__ = '.'.join(__version_info__)
__maintainer__ = "Patric Pendelin"
__email__ = ""
__status__ = "Prototype"


import sys
import getopt
import os

class NumberList(list):
    pass    #much code deleted
class FrequencyDistribution(dict):
    pass    #much code deleted

DEBUG = False

def convert_special_characters(value):
    '''
    d = {u'\u00E4':'&auml;', u'\u00C4':'&Auml;',
     u'\u00FC':'&uuml;', u'\u00DC':'&Uuml;',
     u'\u00F6':'&ouml;', u'\u00D6':'&Ouml;', 
     u'\u00DF':'&szlig;'}

    for key in d.iterkeys(): 
        if key in value:
            value = value.replace(key, d[key])
    '''
    return value

def htmlescape(text):
    '''try:
        text = (text).encode('latin-1')
        text = (text).decode('utf-8')
    except:
        text = convert_special_characters(text)
    '''
    text = (text).decode('utf-8')
    from htmlentitydefs import codepoint2name
    d = dict((unichr(code), u'&%s;' % name) for code,name in codepoint2name.iteritems() if code!=38) # exclude "&"    
    if u"&" in text:
        text = text.replace(u"&", u"&amp;")
    for key, value in d.iteritems():
        if key in text:
            text = text.replace(key, value)
    return text


def main():
    USAGE = '''Usage: tweet [options] message

This script scrapes all raw files from path and write it to js file as an javascript array.

Options:

  -h --help : print this help
  -r --raw-path : path to raw files
  -j --js-path : path to js files
  -v --verbose : more output, more power
  '''
    raw_path = ''
    js_path = ''
    verbose = False

    print '#############################################################'
    print '#                                                           #'
    print '#    make_wordlist v'+ __version__+'                                   #'
    print '#                                                           #'
    print '#############################################################\n'
    
    try:
        shortflags = 'hr:j:v'
        longflags = ['help', 'raw-path=', 'js-path=', 'verbose']
        opts, args = getopt.gnu_getopt(sys.argv[1:], shortflags, longflags)
    except getopt.GetoptError, e:
        print e
    for o, a in opts:
        if o in ('-h', "--help"):
            print USAGE
            sys.exit(2)
        if o in ('-r', "--raw-path"):
            raw_path = a
        if o in ('-j', "--js-path"):
            js_path = a
        if o in ('-v', "--verbose"):
            verbose = True

    if DEBUG:
        js_path = 'C:\\_projekte\\opagen\\raw'
        raw_path = 'C:\\_projekte\\opagen\\raw'
        verbose = True

    if raw_path == '':
        print 'give me the raw path'
        print 'abort'
        sys.exit(3)
    if js_path == '':
        print 'give me the ja path'
        print 'abort'
        sys.exit(4)

    print 'try to find rawfiles in %s' % raw_path
    raw_files = []
    for dir_name, dir_names, file_names in os.walk(raw_path):
        for file_name in file_names:
            if '.raw' in file_name:
                print 'found %s' % file_name
                raw_files.append(file_name)

    for raw_file in raw_files:
        js_file = '%s.js' % raw_file.replace('.raw', '')
        path = os.path.join(js_path, js_file)
        dest = open(path, "w")
        wordlist = 'wordlist=['
        path = os.path.join(raw_path, raw_file)
        print 'read rawfile %s' % path
        with open(path) as f:
            for row in f:
                #row = htmlescape(row)
                if verbose:
                    print row.rstrip()
                wordlist += '"%s",' % row.rstrip()
        wordlist = wordlist.rstrip(',')
        wordlist += '];'
        if verbose:
            print 'finish printing wordlist...'
            print wordlist
        path = os.path.join(js_path, js_file)
        print 'write to jsfile %s' % path
        dest.write(wordlist)
        dest.close()
    print 'work done'

if __name__ == "__main__":
    main()
