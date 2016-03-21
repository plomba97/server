var mongoose = require('mongoose'),
    _ = require('underscore'),
    Schema = mongoose.Schema;

var personSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, minlength: [2, "Титлата трябва да садържа поне 2 символа!"], maxlength: [8, "Титлата не трябва да садържа повече от 8 символа!"]},
        firstName: {type: String, required: true, minlength: [2, "Името трябва да садържа поне 2 символа!"], maxlength: [12, "Името не трябва да садържа повече от 12 символа!"]},
        secondName: {type: String, required: false/*, minlength: [2, "Презмето трябва да садържа поне 2 символа!"], maxlength: [12, "Презимето не трябва да садържа повече от 12 символа!"]*/},
        lastName: {type: String, required: true, minlength: [2, "Фамилията трябва да садържа поне 2 символа!"], maxlength: [12, "Фамилията не трябва да садържа повече от 12 символа!"]},
        jobTitle: {type: String, required: false/*, minlength: [2, "Длъжността трябва да садържа поне 2 символа!"], maxlength: [10, "Длъжността не трябва да садържа повече от 10 символа!"]*/},
        secret: {type: String, required: false, default:''},
        groups: [{ type: Schema.Types.ObjectId, ref: 'Group', index: { unique: true } }],
        email: {type: String, required: false, match: [ /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+/, "Невалиден email адрес!" ]},
        phones: {type : Array, required: true/*, validate: {
                validator: function(phones) {
                    var phonesAreValid = true;
                    _.each(phones, function(phone){
                        if(phone.number != '' && !phone.number.match(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm)){
                            phonesAreValid = false;
                        }
                    });
                    return phonesAreValid;
                },
                message: 'Невалиданен телефон!'
        }*/},
        isDeleted: {type: Boolean, required: true}
    }
);

var Person = mongoose.model('Person', personSchema);

module.exports = Person;

