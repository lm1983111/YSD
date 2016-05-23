/**
 * Created by Administrator on 2016/5/9.
 */
function onApplyJoinGroupRequestNotify(){

}
function onApplyJoinGroupAcceptNotify(){

}
function onApplyJoinGroupRefuseNotify(){

}
function onKickedGroupNotify(){

}
function onDestoryGroupNotify(){

}
function onCreateGroupNotify(){

}
function onInvitedJoinGroupNotify(){

}
function onQuitGroupNotify(){

}
function onSetedGroupAdminNotify(){

}

function onCanceledGroupAdminNotify(){

}
function onRevokeGroupNotify(){

}


function  onGroupInfoChangeNotify(){

}

//监听 用户自定义 群系统消息
function onCustomGroupNotify(notify) {
    console.info("执行 用户自定义系统消息 回调： %s", JSON.stringify(notify));
    var reportTypeCh = "[用户自定义系统消息]";
    var content = notify.UserDefinedField;//群自定义消息数据
    addGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
}

//增加一条群组系统消息
function addGroupSystemMsg(type, typeCh, group_id, group_name, msg_content, msg_time) {
    var data = [];
    data.push({
        "ReportType": type,
        "ReportTypeCh": typeCh,
        "GroupId": group_id,
        "GroupName": group_name,
        "MsgContent": msg_content,
        "MsgTime": webim.Tool.formatTimeStamp(msg_time)
    });
    //$('#get_my_group_system_msgs_table').bootstrapTable('append', data);
    //$('#get_my_group_system_msgs_dialog').modal('show');
}