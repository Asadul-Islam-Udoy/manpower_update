class ServicesSearch {
    constructor(query, queryStr) {
      (this.query = query), (this.queryStr = queryStr);
    }
    search() {
      const keyword = this.queryStr.keyword
        ? {
            $or: [
              {
                name: {
                  $regex: this.queryStr.keyword,
                  $options: "i",
                },
              },
              {
                description: {
                  $regex: this.queryStr.keyword,
                  $options: "i",
                },
              },
            ],
          }
        : {};
      this.query = this.query.find({ ...keyword });
      return this;
    }
  }
  module.exports = ServicesSearch;
  