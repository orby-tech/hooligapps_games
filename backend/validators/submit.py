from models.submit import SubmitFormData


def validate_submit_form(data: SubmitFormData):
    errors = []

    if not data.date:
        errors.append({"field": "date", "message": "Date is required"})
    if not data.first_name:
        errors.append({"field": "first_name", "message": "First name is required"})
    if not data.last_name:
        errors.append({"field": "last_name", "message": "Last name is required"})
    if " " in data.first_name:
        errors.append(
            {"field": "first_name", "message": "No whitespace in first name is allowed"}
        )
    if " " in data.last_name:
        errors.append(
            {"field": "last_name", "message": "No whitespace in last name is allowed"}
        )

    error_dict: dict = dict()
    for err in errors:
        error_dict.setdefault(err["field"], []).append(err["message"])
    return error_dict
