Moralis.Cloud.define("fetchNFTDetail", async request => {
  return Moralis.Cloud.httpRequest({
    method: "GET",
    url: request.params.URL
  });
});
