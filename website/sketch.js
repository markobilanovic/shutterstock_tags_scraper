function setup() {
  console.log('running');

  var button = select('#scrape');
  button.mousePressed(scrapeTags);
}

function scrapeTags() {
  var inputURL = select('#urlInput').value();

  if(!isUrl(inputURL))
  {
    if(inputURL != "")
    {
      alert("Please enter a valid URL.");
      return false;
    }
    else
    {
      inputURL = "https://www.shutterstock.com/image-vector/apple-icon-433917766?src=RLIFi9s6_2qHnjEUFESKJA-1-9"
    }
  }

  var data = {
    text: inputURL
  };
  httpPost('scrape/', data, 'json', dataPosted, postErr);
}

function dataPosted(result) {
  console.log(result);
  var txtResult = select('#txtResult');
  if(result.foundResults) {
    txtResult.value(result.values);
  }
  else{
    txtResult.value("No tags were found.");
  }
}

function postErr(err) {
  console.log(err);
}

function isUrl(url) {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(url);
}