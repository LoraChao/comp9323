# create tables in database and add some data
import pymysql
from config import *
import initialize_article

def create_database():
    conn = pymysql.connect(host=DB_URL,
                           user=DB_ACCOUNT,
                           password=DB_PASSWORD)
    conn.cursor().execute('''drop database if exists wellbeing''')
    conn.cursor().execute('''create database if not exists wellbeing''')
    conn.close()
    db = pymysql.connect(
        host=DB_URL,
        port=DB_PORT,
        user=DB_ACCOUNT,
        password=DB_PASSWORD,
        database=DB_NAME,
        charset='utf8'
    )
    c = db.cursor()


    Organization_table = '''
    CREATE TABLE IF NOT EXISTS `Organization` (
    `OrganizationId` int NOT NULL AUTO_INCREMENT,
    `OrganizationName` varchar(255) DEFAULT NULL,
    `Password` varchar(255) NOT NULL,
    `Companyname` varchar(255) DEFAULT NULL,
    `Location` varchar(255) DEFAULT NULL,
    `Field` varchar(255) DEFAULT NULL,
    `Scale` varchar(255) DEFAULT NULL,
    `Description` varchar(255) DEFAULT NULL,
    `Icon` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`OrganizationId`)
    );
    '''
    
    insert_organization = '''
    INSERT INTO `Organization` VALUES 
    (1, "HCS", "123456","HCS","Aus","IT","100","Health care",""),
    (2, "Work & Training Ltd", "qwerty","Work & Training Ltd","Aus","IT","50","Customer service",""),
    (3, "ETS IT", "zxcvbn","ETS IT","Aus","IT","100","Sydney • Parramatta & Western Suburbs",""),
    (4, "RNA", "zxcvbn","RNA","Aus","IT","100","tBrisbane • CBD & Inner Suburbs",""),
    (5, "Figure8 Services", "zxcvbn","Figure8 Services","Aus","BIomedical","70","To provide service delivery and end to end customer  support whilst ensuring all client accounts are meeting SLA.",""),
    (6, "OzShut", "zxcvbn","OzShut","Aus","BIomedical","200","OzShut Roller Shutters is WA's leading Roller Shutter company based right here in Malaga, Perth. OzShut completes all custom made orders locally with a 5 day installation turnaround!",""),
    (7, "JRA ACT Pty Ltd", "zxcvbn","JRA ACT Pty Ltd","Aus","Mechanical","100","Canberra",""),
    (8, "Saluda Medical", "zxcvbn","Saluda Medical","Aus","Mechanical","100","Sydney • North Shore & Northern Beaches",""),
    (9, "Radiant Recruitment", "zxcvbn","Radiant Recruitment","Aus","Mechanical","110","Melbourne • Eastern Suburbs",""),
    (10, "Programmed", "zxcvbn","Programmed","Aus","Mechanical","120","Sydney","");
    '''
    
    Individual_table = '''
    CREATE TABLE IF NOT EXISTS `Individual` (
    `IndividualId` int NOT NULL AUTO_INCREMENT,
    `IndividualName` varchar(255) NOT NULL, 
    `Password` varchar(255) NOT NULL,
    `Title` varchar(255) DEFAULT NULL,
    `Name` varchar(255) DEFAULT NULL,
    `Gender` varchar(255) DEFAULT NULL,
    `Age` varchar(255) DEFAULT NULL,
    `Email` varchar(255) DEFAULT NULL,
    `Skill` varchar(255) DEFAULT NULL,
    `Education` varchar(255) DEFAULT NULL,
    `Experience` varchar(255) DEFAULT NULL,
    `Achievement` varchar(255) DEFAULT NULL,
    `Professional` varchar(255) DEFAULT NULL,
    `CV` varchar(255) DEFAULT NULL,
    `Emo` varchar(255) DEFAULT NULL,
    `Icon` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`IndividualId`)
    );
    '''

    insert_individual = '''
    INSERT INTO `Individual` VALUES 
    (1, "Michelle", "123456", "Dr", "Michelle", "None", "30", "None", "IT", "graduate", "None", "Achievement1","Professional1", "swimming", 1,""),
    (2, "John", "qwerty", "Mr", "John", "Male", "25", "7238971248@gmail.com", "Mechanical", "graduate", "Experience2", "Achievement2","Professional2", "jogging", 0,""),
    (3, "Elen", "asdfghjk", "Mrs", "Elen", "Female", "27", "21412421@gmail.com", "BIomedical", "university", "Experience3", "Achievement3","Professional3", "movie", 0,""),
    (4, "dsjiaodj123@gmail.com", "zxcvbn", "Mr", "Mark", "Male", "29", "dsjiaodj123@gmail.com", "", "", "", "","", "", 0,"");
    '''

    Organization_offer = '''
    CREATE TABLE IF NOT EXISTS `Offer` (
    `OfferId` int NOT NULL AUTO_INCREMENT,
    `OrganizationId` int NOT NULL,
    `CompanyName` varchar(255) DEFAULT NULL,
    `Position` varchar(255) DEFAULT NULL,
    `WorkingLocation` varchar(255) DEFAULT NULL,
    `WorkingHours` varchar(255) DEFAULT NULL,
    `Salary` varchar(255) DEFAULT NULL,
    `Responsibility` varchar(255) DEFAULT NULL,
    `Requirement` varchar(255) DEFAULT NULL,
    `Contact` varchar(255) DEFAULT NULL,
    `Icon` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`OfferId`)
    );
    '''
    
    insert_offer = '''
    INSERT INTO `Offer` VALUES 
    (1, 1, "HCS","Aus","IT Support Officer", "Full time", "$65,000 - $75,000 + super", "Help Desk & IT Support (Information & Communication Technology)", "IT", "HCS is looking for an IT support officer to join our team and grow our customer support offering. ", ""),
    (2, 2, "Work & Training Ltd","Aus","Information Technology Traineeships", "Contract/Temp", "Negotiable", "Help Desk & IT Support (Information & Communication Technology)", "IT", "Work & Training are seeking expressions of interest for upcoming Information Technology traineeships in Hobart!", ""),
    (3, 3, "ETS IT","Aus","IT Support Technician", "Full time", "Negotiable", "Help Desk & IT Support (Information & Communication Technology)", "IT", "Sydney • Parramatta & Western Suburbs", ""),
    (4, 4, "RNA","Aus","ICT Support Officer", "Full time", "Negotiable", "Help Desk & IT Support (Information & Communication Technology)", "IT", "The ICT Support Officer is primarily responsible for assisting in the resolution of Service Desk Requests both formal and informal within the RNA showgrounds, responding and achieving outcomes in a satisfactory time frame. ", ""),
    (5, 5, "Figure8 Services","Aus","Service Delivery Coordinator/Field Service Technician", "Full time", "$55,000 - $59,999", "Technicians (Trades & Services)", "BIomedical", "Service Delivery Coordinator/Field Service Technician", ""),
    (6, 5, "Figure8 Services","Aus","Service Delivery Manager", "Full time", "$65,000 - $69,999", "Management (Information & Communication Technology)", "BIomedical", "To provide service delivery and end to end customer  support whilst ensuring all client accounts are meeting SLA.", ""),
    (7, 6, "OzShut","Aus","Service Technician", "Full time", "$50,488.03 plus super", "Technicians (Trades & Services)", "BIomedical", "OzShut Roller Shutters is WA's leading Roller Shutter company based right here in Malaga, Perth. OzShut completes all custom made orders locally with a 5 day installation turnaround!", ""),
    (8, 6, "OzShut","Aus","Appointment Setter and Qualifier", "Full time", "$25 - $34.99 per hour + Super + Comms + Bonuses", "Sales - Outbound (Call Centre & Customer Service)", "BIomedical", "Perth • Eastern Suburbs", ""),
    (9, 7, "Saluda Medical","Aus","Mechanical Engineer", "Full time", "Negotiable", "Mechanical Engineering (Engineering)", "Mechanical", "Sydney • North Shore & Northern Beaches", ""),
    (10, 8, "JRA ACT Pty Ltd","Aus","Mechanical Engineer Discipline Leader", "Full time", "Negotiable", "Mechanical Engineering (Engineering)", "Mechanical", "Canberra", ""),
    (11, 9, "Radiant Recruitment","Aus","Mechanical Engineer", "Contract/Temp", "Negotiable", "Mechanical Engineering (Engineering)", "Mechanical", "contact11", "Melbourne • Eastern Suburbs"),
    (12, 9, "Radiant Recruitment","Aus","Electronics Technician", "Full time", "Negotiable", "Technicians (Trades & Services)", "Mechanical", "Melbourne • Eastern Suburbs", ""),
    (13, 9, "Radiant Recruitment","Aus","Customer Service | Administration | Marketing Officer", "Part time", "Negotiable", "Client & Sales Administration (Administration & Office Support)", "Mechanical", "Melbourne • CBD & Inner Suburbs", ""),
    (14, 10, "Programmed","Aus","Mechanical Tradesperson", "Full time", "Competitive rates + Great Benefits", "Fitters, Turners & Machinists (Trades & Services)", "Mechanical", "Sydney", "");
    '''

    Individual_prefer = '''
    CREATE TABLE IF NOT EXISTS `IndividualPrefer` (
    `PreferID` int NOT NULL AUTO_INCREMENT,
    `IndividualId` int NOT NULL,
    `ArticleID` int NOT NULL,
    `Type` varchar(255) NOT NULL,
    PRIMARY KEY (`PreferID`)
    );
    ''' 

    insert_individualPrefer = '''
    INSERT INTO `IndividualPrefer` VALUES 
    (0, 1, 1, "Mental"),
    (0, 1, 30, "Medicle"),
    (0, 1, 31, "Medicle"),
    (0, 1, 26, "Interview"),
    (0, 1, 27, "Interview"),
    (0, 1, 28, "Interview"),
    (0, 1, 38, "Skill"),
    (0, 1, 10, "Covid"),
    (0, 1, 11, "Covid"),
    (0, 1, 12, "Covid"),
    (0, 2, 26, "Interview"),
    (0, 2, 27, "Interview"),
    (0, 2, 28, "Interview"),
    (0, 2, 29, "Interview"),
    (0, 3, 1, "Mental"),
    (0, 3, 38, "Skill"),
    (0, 3, 17, "Covid"),
    (0, 3, 16, "Covid"),
    (0, 3, 15, "Covid"),
    (0, 3, 14, "Covid"),
    (0, 2, 39, "BIomedical"),
    (0, 2, 40, "BIomedical"),
    (0, 3, 49, "Mechanical"),
    (0, 3, 50, "Mechanical");
    '''
    
    Individual_preferOffer = '''
    CREATE TABLE IF NOT EXISTS `IndividualPreferOffer` (
    `PreferID` int NOT NULL AUTO_INCREMENT,
    `IndividualId` int NOT NULL,
    `OfferID` int NOT NULL,
    `Type` varchar(255) NOT NULL,
    PRIMARY KEY (`PreferID`)
    );
    ''' 

    insert_individualPreferOffer = '''
    INSERT INTO `IndividualPreferOffer` VALUES 
    (1, 1, 1, "Offer1"),
    (2, 1, 2, "Offer2"),
    (3, 2, 2, "Offer3"),
    (4, 2, 12, "Offer4"),
    (5, 2, 8, "Offer5"),
    (6, 3, 7, "Offer6"),
    (7, 3, 5, "Offer7"),
    (8, 4, 11, "Offer8"),
    (9, 4, 12, "Offer9"),
    (10, 4, 3, "Offer10"),
    (11, 1, 12, "Offer11"),
    (12, 2, 3, "Offer12"),
    (13, 2, 5, "Offer13"),
    (14, 3, 11, "Offer14"),
    (15, 4, 5, "Offer15"),
    (16, 4, 7, "Offer16"),
    (17, 2, 4, "Offer17"),
    (18, 1, 3, "Offer18"),
    (19, 3, 2, "Offer19"),
    (20, 1, 3, "Offer20");
    '''
    
    Vedio_table = '''
    CREATE TABLE IF NOT EXISTS `Vedio` (
    `VedioID` int NOT NULL AUTO_INCREMENT,
    `VedioLink` varchar(255) NOT NULL,
    `VedioLikeNum` int NOT NULL,
    `VedioTag` varchar(255) NOT NULL,
    PRIMARY KEY (`VedioID`));'''
    
    insert_vedio = ''''''

    Article_table = '''
    CREATE TABLE IF NOT EXISTS `Article` (
    `ArticleID` int NOT NULL AUTO_INCREMENT,
    `ArticleTitle` varchar(255) NOT NULL,
    `Author` varchar(255) NOT NULL,
    `Article` TEXT,
    `ArticleLikeNum` int NOT NULL,
    `ArticleTag` varchar(255) NOT NULL,
    `Icon` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`ArticleID`));'''

    
    FollowList_ind ='''
    CREATE TABLE IF NOT EXISTS `indfollowlist` (
    `FollowID` int NOT NULL AUTO_INCREMENT,
    `IndividualID` int NOT NULL,
    `IndID` int NOT NULL,
    PRIMARY KEY (`followID`));
    '''
    insert_follow_ind = '''
    INSERT INTO `indFollowList` VALUES 
    (1, 1, 1),
    (2, 1, 2),
    (3, 2, 2);
    '''
    FollowList_org ='''
    CREATE TABLE IF NOT EXISTS `orgfollowlist` (
    `FollowID` int NOT NULL AUTO_INCREMENT,
    `IndividualID` int NOT NULL,
    `OrgID` int NOT NULL,
    PRIMARY KEY (`followID`));
    '''
    insert_follow_org = '''
    INSERT INTO `orgFollowList` VALUES 
    (1, 1, 1),
    (2, 1, 2),
    (3, 2, 2);
    '''
    
    Individual_mood = '''
    CREATE TABLE IF NOT EXISTS `Mood` (
    `MoodID` int NOT NULL AUTO_INCREMENT,
    `IndividualId` int NOT NULL,
    `RecordTime` varchar(255) DEFAULT NULL,
    `Mood` int DEFAULT NULL,
    PRIMARY KEY (`MoodID`)
    );
    ''' 

    insert_mood = '''
    INSERT INTO `Mood` VALUES 
    (1, 1, "01/01/2022", 1),
    (2, 2, "01/02/2022", 3),
    (3, 3, "01/03/2022", 2);
    '''
    
    Individual_taste = '''
    CREATE TABLE IF NOT EXISTS `Taste` (
    `TasteID` int NOT NULL AUTO_INCREMENT,
    `IndividualId` int NOT NULL,
    `Mental` int default 0,
    `Medicle` int default 0,
    `Interview` int default 0,
    `Skill` int default 0,
    `Fun` int default 0,
    `Covid` int default 0,
    `IT` int default 0,
    `BIomedical` int default 0,
    `Mechanical` int default 0,
    PRIMARY KEY (`TasteID`)
    );
    '''

    insert_taste = '''
    INSERT INTO `Taste` VALUES
    (1,1,1,2,3,1,0,3,0,0,0),
    (2,2,0,0,4,0,0,0,0,2,0),
    (3,3,1,0,1,0,0,4,0,0,2),
    (4,4,0,0,0,0,0,0,0,0,0);
    '''

    Experts = '''
    CREATE TABLE IF NOT EXISTS `Experts` (
    `ExpertsID` int NOT NULL AUTO_INCREMENT,
    `ExpertsName` varchar(255) DEFAULT NULL,
    `Tag` varchar(255) DEFAULT NULL,
    `Introduce` varchar(255) DEFAULT NULL,
    `Email` varchar(255) DEFAULT NULL,
    `Icon` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`ExpertsID`)
    );
    '''

    insert_Experts = '''
    INSERT INTO `Experts` VALUES
    (1,"Carol","IT","test1","sadasdas@gmail.com",""),
    (2,"May","Mechanical","test2","swjqioenqwoen@gmail.com",""),
    (3,"Linda","Psychology","test3","123no12no3k2nokcbha@gmail.com",""),
    (4,"Jennifer","BIomedical","test4","sdasqwoen@gmail.com",""),
    (5,"Francis","Mechanical","test5","swjqioenqwoen@gmail.com",""),
    (6,"Michael","Psychology","test6","io0nion93@gmail.com",""),
    (7,"Jack","Mechanical","test7","u90jonsakodm@gmail.com",""),
    (8,"Monica","IT","test8","j908scnja0cnmas0@gmail.com","");
    '''

    Sentence = '''
    CREATE TABLE IF NOT EXISTS `Sentence` (
    `SentenceID` int NOT NULL AUTO_INCREMENT,
    `Content` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`SentenceID`)
    );
    '''

    insert_sentence = '''
    INSERT INTO `Sentence` VALUES
    (1,"Wasting time is robbing oneself."),
    (2,"Zero in your target,and go for it."),
    (3,"Take control of your own desting."),
    (4,"Be more opti mistic! Its not the end of the world."),
    (5,"Dont get down. Things will work out eventually."),
    (6,"Hang in there! Stick to it! The victory will go to you in theend."),
    (7,"Life is full of trial and error. One failure doesnt mean youre out of the picture."),
    (8,"Keep your chin up. Everything will be all right."),
    (9,"Do not,for one repulse,give up the purpose that you resolved to effect."),
    (10,"Is not my persistence, but because you deserve let me for you.");
    '''


#create table
    c.execute(Organization_table)
    c.execute(Individual_table)
    c.execute(Organization_offer)
    c.execute(Article_table)
    c.execute(Individual_prefer)
    c.execute(FollowList_ind)
    c.execute(FollowList_org)
    c.execute(Individual_mood)
    c.execute(Individual_preferOffer)
    c.execute(Individual_taste)
    c.execute(Experts)
    c.execute(Sentence)

#insert data
    c.execute(insert_organization)
    db.commit()
    c.execute(insert_individual)
    db.commit()
    c.execute(insert_offer)
    db.commit()
    c.execute(insert_individualPrefer)
    db.commit()
    c.execute(insert_follow_org)
    db.commit()
    c.execute(insert_follow_ind)
    db.commit()
    c.execute(insert_mood)
    db.commit()
    c.execute(insert_individualPreferOffer)
    db.commit()
    c.execute(insert_taste)
    db.commit()
    c.execute(insert_Experts)
    db.commit()
    c.execute(insert_sentence)
    db.commit()
    c.execute(initialize_article.Mental_article)
    db.commit()
    c.execute(initialize_article.Covid_article)
    db.commit()
    c.execute(initialize_article.Fun_article)
    db.commit()
    c.execute(initialize_article.Interview_article)
    db.commit()
    c.execute(initialize_article.Medicle_article)
    db.commit()
    c.execute(initialize_article.Skill_article)
    db.commit()
    c.execute(initialize_article.BIomedical_article)
    db.commit()
    c.execute(initialize_article.IT_article)
    db.commit()
    c.execute(initialize_article.Mechanical_article)
    db.commit()
    
    c.close()

    return True


if __name__ == "__main__":
    create_database()
