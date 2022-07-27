import './JobDetails.scss'
import { Badge, Descriptions } from 'antd';
import React from 'react';
import {  Footer, Content } from "antd/lib/layout/layout";

const JobDetails = () => (

  <Descriptions title="Job Description" bordered>
    <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
    <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
    <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
    <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
    <Descriptions.Item label="Usage Time" span={2}>
      2019-04-24 18:00:00
    </Descriptions.Item>
    <Descriptions.Item label="Status" span={3}>
      <Badge status="processing" text="Running" />
    </Descriptions.Item>
    <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
    <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
    <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
    <Descriptions.Item label="Config Info">
      Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1<br />
    </Descriptions.Item>
  </Descriptions>
  
);

export default JobDetails;

// json文档
//1. for current user's profile page：
const info = {
    userInfo:[
        {
            userIcon: "link", //头像
            UserName: "string", 
            userdescription: "text", // i.e."student, IT, UNSW"
            todayMood: "link" //  如未修改默认happy face
        }
    ],
    followCompanyList: [
        {
            OrganizationId: "int",
            OrganizationName: "string",
            Description:"string",
            Icon:"link", 
            follow: "1"
        }
    ],
    followIndividualList: [
        {
            UserID: "int",
            UserName: "string",
            Icon:"link", 
            follow: "1"
        }
    ],
    JobPreferenceList:[
        {
            CompanyIcon: "link",
            CompanyName: "string",
            JobType: "string", //i.e. developer
            JobLink: "link",
            follow: '1'
        }
    ],
    LikedArticlesList:[
        {
            ArticleName:"string",
            ArticleIcon:"link",
            follow: '1',
            Articlelink: 'link'
        }
    ]

}

//2. for articles details page:
const articles = {
    writerIcon: "link",
    title: "text",
    label: "text", // 文章的标签 1个就好 i.e. experience/mental health
    wordContent: "text", // 正文 文字部分
    pictureContent: 'link', // 图片一张
    like:'1/0', // 当前用户喜欢该文章没
    follow: '1/0' // 当前用户喜欢该作者没
}

//3.  for follow page：
const  followList = {
    followCompanyList: [
        {
            OrganizationId: "int",
            OrganizationName: "string",
            Description:"string",
            Icon:"link", 
            follow: "1"
        }
    ],
    followIndividualList: [
        {
            UserID: "int",
            UserName: "string",
            Icon:"link", 
            follow: "1"
        }
    ],
}

//4. for current Job Preference page：
const  JobPreference = {
    JobPreferenceList:[
        {
            CompanyIcon: "link",
            CompanyName: "string",
            JobType: "string", //i.e. developer
            JobLink: "link",
            follow: '1'
        }
    ],
}