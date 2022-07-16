import { makeAutoObservable } from 'mobx'
import { http } from "@/utils"

class IndividualFollowCompany{

    followList = []

    constructor(){
        makeAutoObservable(this)
    }
    Getlist = async () => {
        const res = await http.request({
            url:'/cont/1/followList',
            //url: `https://randomuser.me/api/?results=2&inc=name,gender,email,nat,picture&noinfo`,
            method: 'get',
            //params: id
        })
        this.followList = res.message
        //return res.message
        //console.log(res.message)
    }
    //followList = this.Getlist();
    

    toggleFollow (id){
        this.Getlist()
        console.log(this.followList)
        const item = this.followList.find(item => item.OrganizationId === id)
       // console.log(item)
        //item.follow == 'follow' ? 'unfollow' : 'follow'
        // if (item.follow !== 'follow')
        // {
        //     item.follow = "follow";
        // }
        // else{
        //     item.follow = "unfollow";
        // }
    }
}

export default IndividualFollowCompany