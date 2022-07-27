# create tables in database and add some data
import pymysql
from config import *


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
    `Description` varchar(255)  DEFAULT NULL,
    `Icon` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`OrganizationId`)
    );
    '''
    
    insert_organization = '''
    INSERT INTO `Organization` VALUES 
    (1, "Anonymous", "123456","good",""),
    (2, "Enterprise", "qwerty","we are rich","/src/assets/sad.png"),
    (3, "Company", "zxcvbn","","");
    '''
    
    Individual_table = '''
    CREATE TABLE IF NOT EXISTS `Individual` (
    `IndividualId` int NOT NULL AUTO_INCREMENT,
    `IndividualName` varchar(255) NOT NULL, 
    `Password` varchar(255) NOT NULL,
    `Preference` varchar(255) DEFAULT NULL,
    `Occupation` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`IndividualId`)
    );
    '''

    insert_individual = '''
    INSERT INTO `Individual` VALUES 
    (1, "Anonymous", "123456", "computer", "IT"),
    (2, "John", "qwerty", "economy", "Financial Analyst"),
    (3, "Elen", "zxcvbn", "mechanical", "Mechanical Engineers");
    '''

    Organization_offer = '''
    CREATE TABLE IF NOT EXISTS `Offer` (
    `OfferId` int NOT NULL AUTO_INCREMENT,
    `OrganizationId` int NOT NULL,
    `Salary` varchar(255) NOT NULL,
    `Working hours` varchar(255) NOT NULL,
    `Tag` varchar(255) NOT NULL,
    PRIMARY KEY (`OfferId`)
    );
    '''
    
    insert_offer = '''
    INSERT INTO `Offer` VALUES 
    (1, 1, "100,000 per year", "7h per day", "computer"),
    (2, 2, "80,000 per year", "7h per day", "economy"),
    (3, 3, "90,000 per year", "7h per day", "mechanical");
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
    (1, 1, 1, "article"),
    (2, 1, 2, "article"),
    (3, 2, 2, "article");
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
    `Author` varchar(255) NOT NULL,
    `Article` TEXT,
    `ArticleLikeNum` int NOT NULL,
    `ArticleTag` varchar(255) NOT NULL,
    PRIMARY KEY (`ArticleID`));'''

    insert_article = '''
    INSERT INTO `Article` VALUES 
    (1,"a", "asd", 0, "computer"),
    (2,"b", "fdgsdfgdf", 0, "economy"),
    (3,"c", "asdfasdfsfasdf",0, "mechanical");
    '''
    FollowList_ind ='''
    CREATE TABLE IF NOT EXISTS `indfollowlist` (
    `FollowID` int NOT NULL AUTO_INCREMENT,
    `IndividualID` int NOT NULL,
    `indID` int NOT NULL,
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
    `orgID` int NOT NULL,
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
    `Mood` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`MoodID`)
    );
    ''' 

    insert_mood = '''
    INSERT INTO `Mood` VALUES 
    (1, 1, "01/01/2022", "Well"),
    (2, 2, "01/02/2022", "Bad"),
    (3, 3, "01/03/2022", "Average");
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

#insert data
    c.execute(insert_organization)
    db.commit()
    c.execute(insert_individual)
    db.commit()
    c.execute(insert_offer)
    db.commit()
    c.execute(insert_individualPrefer)
    db.commit()
    c.execute(insert_article)
    db.commit()
    c.execute(insert_follow_org)
    db.commit()
    c.execute(insert_follow_ind)
    db.commit()
    c.execute(insert_mood)
    db.commit()
     
    c.close()

    return True


if __name__ == "__main__":
    create_database()
