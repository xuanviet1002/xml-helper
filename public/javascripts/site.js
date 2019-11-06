var xmlDoc;
      
var openLoading = function(){
    $('#app-loading').css('display', 'block');
}
var removeLoading = function(){
    $('#app-loading').css('display', 'none');
}

var openFile = function(event) {
        
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        openLoading();
        var text = reader.result;
        $('#txtContent').text(text);
        xmlDoc = new DOMParser().parseFromString(text,"text/xml");
        removeLoading();
    };
    reader.readAsText(input.files[0]);
};

$('input[type=text]').on('keydown', function(e) {
    if (e.which == 13) {
        search();
        e.preventDefault();
    }
});

var search = function(){

    let txtDescendants = $('#txtDescendants').val().trim();
    let txtKeyword = $('#txtKeyword').val().trim();
    if(!txtDescendants && !txtKeyword) return;

    openLoading();
    $('#boxResult').text('');
    let descendants = xmlDoc.getElementsByTagName(txtDescendants);
    for (i = 0; i < descendants.length; i++) {
        let nodeVal = '';
        if(txtKeyword){
            let nodes = descendants[i].getElementsByTagName(txtKeyword);
            for(j = 0; j < nodes.length; j++){
                nodeVal += nodes[j].innerHTML;
            }
        }
        else
        {
            nodeVal = descendants[i].innerHTML;
        }
        if(!nodeVal)
            nodeVal = descendants[i].getAttribute(txtKeyword);
            
        if(nodeVal)
        {
            $('#boxResult').append(nodeVal + '<br>');
        }
    }

    removeLoading();
}

$('#chkWrapText').change(function(){
    if(this.checked)
    {
        $('#txtContent').css('white-space', 'inherit');
    }
    else
    {
        $('#txtContent').css('white-space', 'pre');
    }
});