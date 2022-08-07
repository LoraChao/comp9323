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
    (1, "Anonymous", "123456","test1","Aus","IT","50","test1",""),
    (2, "Enterprise", "qwerty","test2","Aus","Mechanical","50","test2",""),
    (3, "Company1", "zxcvbn","test3","Aus","BIomedical","100","test3",""),
    (4, "Company2", "zxcvbn","test4","Aus","IT","60","test4",""),
    (5, "Company3", "zxcvbn","test5","Aus","BIomedical","70","test5",""),
    (6, "Company4", "zxcvbn","test6","Aus","BIomedical","80","test6",""),
    (7, "Company5", "zxcvbn","test7","Aus","IT","100","test7",""),
    (8, "Company6", "zxcvbn","test8","Aus","Mechanical","90","test8",""),
    (9, "Company7", "zxcvbn","test9","Aus","Mechanical","110","test9",""),
    (10, "Company8", "zxcvbn","test10","Aus","BIomedical","120","test10","");
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
    (1, 1, "UNSW","Aus","Aus", "7h per day", "100,000 per year", "Responsibility1", "IT", "contact1", ""),
    (2, 2, "USYD","Aus","Aus", "7h per day", "80,000 per year", "Responsibility2", "Mechanical", "contact2", ""),
    (3, 3, "UQ","Aus","Aus", "7h per day", "100,000 per year", "Responsibility3", "BIomedical", "contact3", ""),
    (4, 4, "UQ","Aus","Aus", "8h per day", "90,000 per year", "Responsibility4", "IT", "contact4", ""),
    (5, 5, "UQ","Aus","Aus", "8h per day", "90,000 per year", "Responsibility5", "BIomedical", "contact5", ""),
    (6, 6, "USYD","Aus","Aus", "9h per day", "100,000 per year", "Responsibility6", "IT", "contact6", ""),
    (7, 7, "USYD","Aus","Aus", "9h per day", "90,000 per year", "Responsibility7", "BIomedical", "contact7", ""),
    (8, 8, "UNSW","Aus","Aus", "7h per day", "70,000 per year", "Responsibility8", "Mechanical", "contact8", ""),
    (9, 9, "UNSW","Aus","Aus", "6h per day", "80,000 per year", "Responsibility9", "BIomedical", "contact9", ""),
    (10, 10, "USYD","Aus","Aus", "9h per day", "80,000 per year", "Responsibility10", "Mechanical", "contact10", ""),
    (11, 4, "UNSW","Aus","Aus", "8h per day", "10,000 per year", "Responsibility11", "BIomedical", "contact11", ""),
    (12, 5, "USYD","Aus","Aus", "7h per day", "90,000 per year", "Responsibility12", "IT", "contact12", "");
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
    (1, 1, 1, "Mental"),
    (2, 1, 2, "Medicle"),
    (3, 2, 2, "Medicle");
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
    (4, 10, 12, "Offer4"),
    (5, 8, 8, "Offer5"),
    (6, 8, 7, "Offer6"),
    (7, 6, 5, "Offer7"),
    (8, 9, 11, "Offer8"),
    (9, 7, 12, "Offer9"),
    (10, 5, 3, "Offer10"),
    (11, 4, 12, "Offer11"),
    (12, 9, 3, "Offer12"),
    (13, 7, 5, "Offer13"),
    (14, 9, 11, "Offer14"),
    (15, 5, 5, "Offer15"),
    (16, 6, 7, "Offer16"),
    (17, 3, 4, "Offer17"),
    (18, 5, 3, "Offer18"),
    (19, 6, 2, "Offer19"),
    (20, 9, 3, "Offer20");
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
    (1, 1, "01/01/2022", 3),
    (2, 2, "01/02/2022", 1),
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
    PRIMARY KEY (`TasteID`)
    );
    '''

    insert_taste = '''
    INSERT INTO `Taste` VALUES
    (1,0,1,2,3,1,0,3,0),
    (2,1,1,0,0,6,0,0,0),
    (3,0,1,0,4,0,0,4,0),
    (4,0,0,0,0,0,0,0,0);
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
