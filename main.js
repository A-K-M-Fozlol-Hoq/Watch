document.getElementById('issueInputForm').addEventListener('submit', submitIssue);



function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id:id, description:description, severity:severity, assignedTo:assignedTo, status:status };

  if (localStorage.getItem('issues')===null){
    let issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }
  else{
   // let issues = [];
    // issues = JSON.parse(localStorage.getItem('issues'));
  let issues = JSON.parse(localStorage.getItem('issues') || '[]');
    //  issues.push(issue);
      issues = [].concat.apply([],issues, issue);
    //  console.log(issue);
    //  console.log(issues);
     issues.push(issue);
    //  console.log(issues);
    localStorage.setItem('issues', JSON.stringify(issues));
  }
  

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}


//issues = JSON.parse(localStorage.getItem('issues') || '[]');
const setStatusClosed = id => {

  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter( issue => issue.id !== id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

function fetchIssues () {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = ' ';

  for (var i = 0; i < issues.length; i++) {
    //const {id, description, severity, assignedTo, status} = issues[i];
    let id=issues[i].id;
    let description=issues[i].description;
    let severity= issues[i].severity;
    let assignedTo=issues[i].assignedTo;
    let status=issues[i].status;
    if(issues[i].status !=='Open'){
      description = description.strike();
    }

    issuesList.innerHTML +=   '<div class="well">'+
                              '<h6>Issue ID: '+id+' </h6>'+
                              '<p><span class="label label-info">' +status +'</span></p>'+
                              '<h3>  '+ description+' </h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> '+severity+'</p>'+
                              '<p><span class="glyphicon glyphicon-user"></span>'+ assignedTo+'</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')"   class="btn btn-warning">Close</a>' +
                              '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' +
                              '</div>';
                              
  }
  


 


  document.getElementById('total').innerText=i;
  let open=0;
  for (let i = 0; i < issues.length; i++) {
    if(issues[i].status==='Open'){
      open ++;
    }
    
  }
  document.getElementById('open').innerText=open;


 
 
}

