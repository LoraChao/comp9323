from flask_restx import fields
from flask_app import api


# predefine model
individual_model = api.model("individual", {
    "IndividualName": fields.String,
    "Password": fields.String,
    "Preference": fields.String,
    "Occupation": fields.String,
})

organization_model = api.model("organization", {
    "OrganizationName": fields.String,
    # "email": fields.String,
    "password": fields.String,
    # "preference": fields.String,
})

login_model = api.model("login", {
    "Name": fields.String,
    "password": fields.String
})

offer_model = api.model("offer post", {
    "OrganizationId": fields.Integer,
    "Salary": fields.String,
    "Workinghours": fields.String,
    "Tag": fields.String
})

search_organizations_model = api.model("search organization", {
    "OfferId": fields.Integer,
    "Salary": fields.String,
    "Workinghours": fields.String,
    "Tag": fields.String
})

post_dairy_model = api.model("dairy post", {
    "IndividualId": fields.Integer,
    "IndividualName": fields.String,
    "Date": fields.String,
    "Content": fields.String
})

search_dairy_model = api.model("dairy search", {
    "IndividualId": fields.Integer,
    "IndividualName": fields.String,
    "Date": fields.String,
    "Content": fields.String
})

#shell's work
follow_ind_moedl = api.model("ind followed update", {"indID":fields.Integer})

follow_org_moedl = api.model("org followed update", {"orgID":fields.Integer})

follow_model = api.model("follow delete", {
    "Company": fields.List(fields.Integer),
    "Individual": fields.List(fields.Integer)
})
