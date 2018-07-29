'use strict';

var _localStorage = require('./localStorage');

var _localStorage2 = _interopRequireDefault(_localStorage);

var _dictionary = require('../dictionary');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.localStorage = new _localStorage2.default();

describe('Dictionary', function () {
  var dictionaryInstance = void 0;
  var dictionaries = [require('./locales/en-us.js'), require('./locales/es-ec')];

  describe('when is node', function () {
    describe('es-ec', function () {
      beforeEach(function () {
        (0, _dictionary.translateJs)({ id: 'es-ec', dictionaries: dictionaries });
      });

      it('should instance dictionary.t and return correct translation', function () {
        expect((0, _dictionary.t)('key1', 'enOtherText1')).toBe('esTranslateKey1');
        expect((0, _dictionary.t)('KeY2', 'enOtherText2')).toBe('EsTranslateKey2');
      });
    });

    describe('en-us', function () {
      beforeEach(function () {
        (0, _dictionary.translateJs)({ id: 'en-us', dictionaries: dictionaries });
      });

      it('should instance dictionary.t and return correct translation', function () {
        expect((0, _dictionary.t)('key1', 'esTranslateKey1')).toBe('enTranslateKey1');
        expect((0, _dictionary.t)('key2', 'esTranslateKey2')).toBe('enTranslateKey2');
      });
    });

    describe('when key not exist', function () {
      beforeEach(function () {
        (0, _dictionary.translateJs)({ id: 'es-ec', dictionaries: dictionaries });
      });

      it('should instance dictionary.t and return text if translation not exists', function () {
        expect((0, _dictionary.t)('key3', 'esTranslateKey3')).toBe('esTranslateKey3');
      });
    });

    describe('when dictionary not exist', function () {
      beforeEach(function () {
        (0, _dictionary.translateJs)({ id: 'notExist', dictionaries: dictionaries });
      });

      it('should instance dictionary.t and return text if translation not exists', function () {
        expect((0, _dictionary.t)('key3', 'esTranslateKey3')).toBe('esTranslateKey3');
        expect((0, _dictionary.t)('Key3', 'esTranslateKey3')).toBe('EsTranslateKey3');
      });
    });

    describe('when dictionary instance without id', function () {
      beforeEach(function () {
        var newDictionaries = [{
          id: 'en-us',
          label: 'EN',
          values: { newkey: 'newKeyValue' }
        }];

        localStorage.setItem('idukayTranslateJS', JSON.stringify({ id: 'en-us' }));
        (0, _dictionary.translateJs)({ dictionaries: newDictionaries });
      });

      it('should instance t and return new value', function () {
        expect((0, _dictionary.t)('newKey', 'value')).toBe('newKeyValue');
      });
    });

    describe('when not has localStorage', function () {
      beforeEach(function () {
        var newDictionaries = [{
          id: undefined
        }];

        (0, _dictionary.translateJs)({ dictionaries: newDictionaries });
      });

      it('should instance t and return value', function () {
        expect((0, _dictionary.t)('key', 'value')).toBe('value');
      });
    });
  });
});