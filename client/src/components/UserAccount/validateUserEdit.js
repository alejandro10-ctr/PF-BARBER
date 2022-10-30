export function validate(values) {
    let errors = {};
    if (!values.name) {
        errors.name = 'Name is required';
    } else if (!/^([a-zA-Z\s]){3,50}$/g.test(values.name)) {
        errors.name = 'Name is invalid';
    }
    if (!values.lastname) {
        errors.lastname = 'Lastname is required';
    } else if (!/^([a-zA-Z\s]){3,50}$/g.test(values.lastname)) {
        errors.lastname = 'Lastname is invalid';
    }
    if (!values.phone) {
        errors.phone = 'Phone is required';
    } else if (!/^((\+|)[0-9]{1,3}(-|\s)[0-9]{2,4}(-|\s)[0-9]{6,8})$/g.test(values.phone)) {
        errors.phone = 'Phone is invalid';
    }
    return errors;
};