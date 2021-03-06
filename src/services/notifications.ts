import { stringify } from "querystring";

// sending notification to the client logic..
interface configNotification{
  to: string;
  from?: string;
  type: string;
  teamname?: string;
  drivename?: string;
  initiator?: string;
}


class Notification{
  notification: configNotification;
  constructor(x: configNotification){
    this.notification = {to:"",type:""};
    this.notification.to = x.to;
    if(x.from) this.notification.from = x.from;
    this.notification.type = x.type;
    if(x.teamname) this.notification.teamname = x.teamname;
    if(x.drivename) this.notification.drivename = x.drivename;
    if(x.initiator) this.notification.initiator = x.initiator;
  }
}

const notifications = {};
/**
 * 
 * @param toAll string
 * @param teamname string
 * @param from string
 * @return void
 */

export const inviteMembersNotification = function (toAll:Array<string>, teamname: string, from: string):void {
  toAll.forEach( (to:string) => {
    const options:configNotification = {to:to,from:from,teamname:teamname,type:"joinTeam"};
    if (notifications[to] === undefined) {
      notifications[to] = [new Notification(options)];
    } else {
      notifications[to].push(new Notification(options));
    }
  });
};

export const teamCreatedNotification = function (toAll:Array<string>,teamname:string):void {
  toAll.forEach((to)=>{
    const options:configNotification = {to:to,type:"teamCreationSuccessful",teamname:teamname};
    if (notifications[to] === undefined) {
      notifications[to] = [new Notification(options)];
    } else {
      notifications[to].push(new Notification(options));
    }
  });
};

export const sendDriveOpenNotification = function (to:string, drivename:string):void {
  const options: configNotification = {to:to, type:"driveOpenSuccessful",drivename:drivename};
  if (notifications[to] === undefined) {
    notifications[to] = [new Notification(options)];
  } else {
    notifications[to].push(new Notification(options));
  }
};

export const askFromMembersNotification = function (toAll:Array<string>, drivename:string, initiator:string):void {
  toAll.forEach((to) => {
    const options:configNotification = {to:to, type:"permissionToOpenDrive",drivename:drivename, initiator:initiator};
    if (notifications[to] === undefined) {
      notifications[to] = [new Notification(options)];
    } else {
      notifications[to].push(new Notification(options));
    }  
  });
};


export const getNotificationsOfUser = function (username:string) : Array<configNotification> {
  if(notifications[username] === undefined) {
    return [];
  }
  else{
    const result = notifications[username];
    delete notifications[username];
    return result;
  } 
};
