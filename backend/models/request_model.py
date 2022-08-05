from flask_restx import fields
from flask_app import api


#Ziyue
individual_model = api.model("individual", {
    "username": fields.String,
    "password": fields.String,
})

organization_model = api.model("organization", {
    "username": fields.String,
    # "email": fields.String,
    "password": fields.String,
    # "preference": fields.String,
})

login_model = api.model("login", {
    "username": fields.String,
    "password": fields.String
})

offer_model = api.model("offer post", {
    "OrganizationId": fields.Integer,
    "company_name": fields.String,
    "position_name": fields.String,
    "working_location_name": fields.String,
    "working_hour_name": fields.String,
    "salary_name": fields.String,
    "responsibility_name": fields.String,
    "requirement_name": fields.String,
    "contact_name": fields.String,
    "icon_name": fields.String
})

search_organizations_model = api.model("search organization", {
    "OrganizationId": fields.Integer
})

search_organizations_details_model = api.model("search organization details", {
    "OrganizationId": fields.Integer,
    "OfferId": fields.Integer
})

post_dairy_model = api.model("dairy post", {
    "IndividualId": fields.Integer,
    "RecordTime": fields.String,
    "Mood": fields.Integer,
})

search_dairy_model = api.model("dairy search", {
    "IndividualId": fields.Integer,
    "RecordTime": fields.String,
})

brief_individual_model = api.model("brief individual get", {
    "userId": fields.Integer,
})

post_individual_model = api.model("post individual model", {
    "username": fields.String,
    "title_name": fields.String,
    "name_name": fields.String,
    "gender_name": fields.String,
    "age_name": fields.String,
    "email_name": fields.String,
    "skill_name": fields.String,
    "education_name": fields.String,
    "experience_name": fields.String,
    "achievement_name": fields.String,
    "professional_name": fields.String,
    "cv_name": fields.String,
    "icon_name": fields.String,
})

post_organization_model = api.model("post organization model", {
    "username": fields.String,
    "companyname_name": fields.String,
    "location_name": fields.String,
    "field_name": fields.String,
    "scale_name": fields.String,
    "description_name": fields.String,
    "icon_name": fields.String,
})

mood_check_model = api.model("check mood model", {
    "IndividualId": fields.Integer
})

delete_offer_model = api.model("delete offer model", {
    "OrganizationId": fields.Integer,
    "OfferId": fields.Integer
})

delete_preferoffer_model = api.model("delete offer model", {
    "userId": fields.Integer,
    "OfferId": fields.Integer
})

preferoffer_model = api.model("post prefer offer model", {
    "userId": fields.Integer,
    "OfferId": fields.Integer
})

get_article_model = api.model("get article model", {
    "Articel_ID": fields.Integer
})

test_model = api.model("get article model", {
    "userId": fields.Integer,
})

update_offer_model = api.model("update offer model", {
    "OfferId": fields.Integer,
    "OrganizationId": fields.Integer,
    "company_name": fields.String,
    "position_name": fields.String,
    "working_location_name": fields.String,
    "working_hour_name": fields.String,
    "salary_name": fields.String,
    "responsibility_name": fields.String,
    "requirement_name": fields.String,
    "contact_name": fields.String,
    "icon_name": fields.String,
})


#Jundi
prefer_model = api.model("article model",{
    "articleID": fields.Integer
})

post_follow_ind_model = api.model("ind followed update", {"indID":fields.Integer})

post_follow_org_model = api.model("org followed update", {"orgID":fields.Integer})

delete_follow_org_model = api.model("org follow delete", {
    "Company": fields.List(fields.Integer)
})

delete_follow_ind_model = api.model("ind follow delete", {
    "Individual": fields.List(fields.Integer)
})

