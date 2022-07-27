import './ArticleDetails.scss'
import { Button, PageHeader, Tag, Typography } from 'antd';
import { Footer, Content } from "antd/lib/layout/layout";
import React from 'react';
const { Paragraph } = Typography;



const wordContent = (
  <>
    <Paragraph>
    Write a career plan. You’re more likely to find the perfect job if you’re clear on the direction you want to take your career in.
    Sit down and write up a plan that encapsulates who you professionally are, must-have job attributes such as career progression
     and working hours, and what organisations you’d like to work for. Keep your plan handy when applying for jobs to see how closely 
     aligned they are. You might find that they’re realistically not even worth applying for!
    </Paragraph>
    <Paragraph>
    Refresh your resume. It’s easy to merely update your resume with an extra few lines each time you change jobs, but if you really 
    want to find a job that’s as far away as possible to your weekend shift work during high school, it’s time to give your resume a 
    makeover.

    It not only needs to look more professional and sophisticated than the earlier days of your career, it needs to provide a snapshot
     of the best roles and experiences you’ve had into a concise one to two page document. Don’t be precious with it – make it reflect
      who you have professionally become today!
    </Paragraph>
  </>
);


const ArticleDetails = () => (

    <PageHeader
        title="Where and how to look for work"
        className="site-page-header"
        subTitle=" "
        tags={<Tag color="blue">Experience</Tag>}
        extra={[
        <Button key="3">Like</Button>,
        <Button key="2">Follow</Button>,
        <Button key="1" type="primary" href='./MyPage'>
            Back
        </Button>,
        ]}
        avatar={{
        src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
        }}
    >
    
    <Content>
        <div >
            <img style={{minHeight:"10px", width:"30%"}}
                src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                alt="content"
                />
        </div>
        <div style={{ textAlign:'left', margin:"40px 100px 0 80px", fontSize:'17px'}}> {wordContent}</div>
        
        {/* {wordContent} */}
    
    </Content>
    <Footer style={{ textAlign: 'center' }}>COMP9323 ©2022 T2 Created by "Github Is Savior"</Footer>
    </PageHeader>

);



export default ArticleDetails