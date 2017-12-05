define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtable', 'ojs/ojarraydataprovider', 'ojs/ojinputtext', 'ojs/ojlabel'],
function(oj, ko, $) {

    var ViewModel = function() {
        var self = this;

        var Country = function(id, name) {
            this.countryId = id;
            this.countryName = name;
        }

        var countries = [
            new Country(0, 'Germany'),
            new Country(1, 'Austria')
        ];

        self.observableCountries = ko.observableArray(countries);
        self.countriesDataProvider = new oj.ArrayDataProvider(
            self.observableCountries, {idAttribute: 'countryId'});

        self.countryId = ko.observable();
        self.countryName = ko.observable();

        self.rowChangeListener = function(evt) {
            if (evt.detail.value) {
                var currentCountry = self.observableCountries()[evt.detail.value.rowIndex];
                self.countryId(currentCountry.countryId);
                self.countryName(currentCountry.countryName);
            }
        }

        self.addCountry = function() {
            self.observableCountries.push(new Country(self.countryId(), self.countryName()));
        }
        self.removeCountry = function(country) {
            self.observableCountries.remove(country);
            self.countryId('');
            self.countryName('');
        }
    };

    return new ViewModel();
});
