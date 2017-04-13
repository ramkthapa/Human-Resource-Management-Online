$(document).ready(function(){

   

    authentication = function(){
        //alert(1);

        $.post("/actadmin",
            {
                username: $("#txtUsername").val(),
                password: $("#txtPassword").val()
            }).done(function( data ) {
                //alert( "Data Loaded: " + data );
                if(data){

                    window.location = '/employee';
                }
                else {
                    alert("Invalid User!");
                    txtPassword.value='';
                    txtUsername.focus();
                }
            });
    }

    authentication_pass=function(){
        $.post("/actChangePass",{
            oldPass: $("#txtoldPass").val(),
            newPass: $("#txtnewPass").val()
        }).done(function(data){
                if(data){
                    alert('Your Password is changed Successfully! \n Please use New Password to Login from the next time');
                    window.location='/employee';
                }
                else{
                    alert('Your old Password donot Match! \n Please try again');
                    txtoldPass.value='';
                    txtnewPass.value='';
                    txtrePass.value='';
                    txtoldPass.focus();
                }
            });
    }

})
