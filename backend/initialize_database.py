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
    (1, "Anonymous", "123456","","","IT","","",""),
    (2, "Enterprise", "qwerty","","","Mechanical","","",""),
    (3, "Company", "zxcvbn","","","BIomedical","","","");
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
    (1, "Anonymous", "123456", "", "", "", "", "", "IT", "", "", "","", "", 0,""),
    (2, "John", "qwerty", "", "", "", "", "", "Mechanical", "", "", "","", "", 0,""),
    (3, "Elen", "zxcvbn", "", "", "", "", "", "BIomedical", "", "", "","", "", 0,"");
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
    (1, 1, "UNSW","Aus","", "7h per day", "100,000 per year", "", "IT", "", ""),
    (2, 2, "USYD","Aus","", "7h per day", "80,000 per year", "", "Mechanical", "", ""),
    (3, 3, "UQ","Aus","", "7h per day", "90,000 per year", "", "", "BIomedical", "");
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
    (3, 2, 2, "Offer3");
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

    insert_article = '''
    INSERT INTO `Article` VALUES 
    (1,"title1","a", "asd", 1, "Mental", ""),
    (2,"title2","b", "fdgsdfgdf", 2, "Medicle", ""),
    (3,"title3","c", "asdfasdfsfasdf",0, "Interview", ""),
    (4,"title4","f", "asdfasdf",0, "Skill", ""),
    (5,"title5","g", "asfsfasdf",0, "Fun", ""),
    (6,"title6","a", "asd", 0, "Mental", ""),
    (7,"title7","b", "fdgsdgdf", 0, "Medicle", ""),
    (8,"title8","e", "sdffasdf",0, "Interview", ""),
    (9,"title9","d", "asdff",0, "Covid", ""),
    (10,"title10","c", "afasdf",0, "Fun", "");
    '''
    
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
    PRIMARY KEY (`TasteID`)
    );
    '''

    insert_taste = '''
    INSERT INTO `Taste` VALUES
    (1,1,1,0,0,0,0,0),
    (2,2,0,2,0,0,0,0);
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
    (1,"a","IT","sdjkslajdklsjdl","sadasdas@gmail.com",""),
    (2,"b","Mechanical","sajidjasdiojasoipdjkop","swjqioenqwoen@gmail.com",""),
    (3,"c","BIomedical","hasniodjnioascnoainc","123no12no3k2nokcbha@gmail.com","");
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
    (1,"test1"),
    (2,"test2"),
    (3,"test3"),
    (4,"test4"),
    (5,"test5"),
    (6,"test6");
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
    c.execute(insert_article)
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
#     db.commit()
#     c.execute(initialize_article.Mental_article)
#     db.commit()
#     c.execute(initialize_article.Mental_article)
#     db.commit()
#     c.execute(initialize_article.Covid_article)
#     db.commit()
#     c.execute(initialize_article.Fun_article)
#     db.commit()
#     c.execute(initialize_article.Interview_article)
#     db.commit()
#     c.execute(initialize_article.Medicle_article)
#     db.commit()
#     c.execute(initialize_article.Skill_article)
#     db.commit()
    
    c.close()

    return True


if __name__ == "__main__":
    create_database()
