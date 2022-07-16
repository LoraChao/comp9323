import { Layout, Card, List, Avatar, Button} from "antd"
import { Header, Footer, Content } from "antd/lib/layout/layout";
import React, { useState, useEffect} from 'react';
import './Test.scss'
import { UserOutlined} from '@ant-design/icons';
// import { useStore } from "@/store"; 
import { http } from "@/utils"

// const id = 2;
// const fakeDataUrl = 'http://127.0.0.1:5000/cont/1/followList';

const tabList = [
    {
        key: 'Company',
        tab: 'Company'
    },
    {
        key: 'Individual',
        tab: 'Individual'
    }
];



function Company(){          // company follow tab 


    const [data, setData] = useState([]);

    // const [params, setParams] = useState({
    //     page: 1,
    //     per_page: 10
    // })
    
    useEffect(() => {
        const Getlist = async () => {
            const res = await http.request({
                url:'/cont/1/followList',
                //url: `https://randomuser.me/api/?results=2&inc=name,gender,email,nat,picture&noinfo`,
                method: 'get',
                //params: id
            })
            setData(res.message);
            
        }    
        Getlist()
    }, [])
    // const  {IndividualFollowCompany} = useStore();

    function clickFollowHandler(id){
        
        //console.log(e)    
        toggleFollow(id)
        return <Button>item.follow</Button>

    }

    function toggleFollow(id){
        const item = data.find(item => item.OrganizationId === id)
        console.log(item)
        if(item.follow === 'follow'){
            item.follow = 'unfollow'
        }
        else{
            item.follow = 'follow'
        }
        return <Button>item.follow</Button>
    }

    return <div>
        <List
            itemLayout="horizontal"
            //loadMore={this.loadMore}
            dataSource={data}
            renderItem={(item) => (
            <List.Item>
                <List.Item.Meta
                avatar={<Avatar size={45} icon={<UserOutlined />} />}
                title={<a href="@">{item.OrganizationName}</a>}
                description={item.Description}
                />
                <Button onClick={() => clickFollowHandler(item.OrganizationId)}>{item.follow}</Button>
            </List.Item>
            )}
        />
    </div>
    
}

class Individual extends React.Component{    // individual follow tab
    render(){
        return <div>
            Individual
        </div>
    }
}

const loadContents = (currTab) => {            // determine which tab to show
    if(currTab === 'Company'){
      return <div><Company/></div>
    }
    return <div><Individual/></div>
  }

   

const Test = () => {
    const [activeTabKey, setActiveTabKey] = useState('tab1');
  
    const onTab1Change = (key) => {
      setActiveTabKey(key);
    };
  


    return(
        <Layout>
            <Header></Header>

            <Content style={{ 
                padding: '0 50px',
                textAlign: 'left',
            }}>
                <Card
                    style={{
                    width: '100%',
                    }}
                    title="Follow"
                    extra={<a href="../MyPage">Back</a>}
                    tabList={tabList}
                    activeTabKey={activeTabKey}
                    onTabChange={(key) => {
                        onTab1Change(key);  
                    }}
                >
                    {loadContents(activeTabKey)}
        </Card>

            </Content>

            <Footer>Footer</Footer>
        </Layout>
    )
    

}




export default Test