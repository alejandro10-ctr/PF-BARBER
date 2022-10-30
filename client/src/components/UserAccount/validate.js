export function validateUser(values) {
    let errors = {};
    if (!values.name) {
        errors.name = 'Name is required';
    } else if (!/^([a-zA-Z\s]){3,50}\S$/g.test(values.name)) {
        errors.name = 'Name is invalid';
    }
    if (!values.lastname) {
        errors.lastname = 'Lastname is required';
    } else if (!/^([a-zA-Z\s]){3,50}\S$/g.test(values.lastname)) {
        errors.lastname = 'Lastname is invalid';
    }
    if (!values.phone) {
        errors.phone = 'Phone is required';
    } else if (!/^((\+|)[0-9]{1,3}(-|\s)[0-9]{2,4}(-|\s)[0-9]{6,8})$/g.test(values.phone)) {
        errors.phone = 'Phone is invalid';
    }
    return errors;
};
export function validateAddress(values) {
    let errors = {};
    if (!values.personReceives) {
        errors.personReceives = 'Person receives is required';
    } else if (!/^([a-zA-Z\s]){3,50}\S$/g.test(values.personReceives)) {
        errors.personReceives = 'Person receives is invalid';
    }
    if (!values.phoneReceives) {
        errors.phoneReceives = 'Phone is required';
    } else if (!/^((\+|)[0-9]{1,3}(-|\s)[0-9]{2,4}(-|\s)[0-9]{6,8})$/g.test(values.phoneReceives)) {
        errors.phoneReceives = 'Phone is invalid';
    }
    if (!values.address) {
        errors.address = 'Address is required';
    } else if (!/([A-Za-z0-9#\s]){5,50}\S/g.test(values.address)) {
        errors.address = 'Address is invalid';
    }
    if (!/^([A-Za-z\s]){0,50}$/g.test(values.descriptionPlace)) {
        errors.descriptionPlace = 'Description place is invalid';
    }
    if (!/^([0-9\S]){0,10}\S$/g.test(values.zipCode)) {
        errors.zipCode = 'Zip code is invalid';
    }
    if (!values.country) {
        errors.country = 'Country is required';
    } else if (!/^([A-Za-z\s]){5,50}\S$/g.test(values.country)) {
        errors.country = 'Country is invalid';
    }
    return errors;
};