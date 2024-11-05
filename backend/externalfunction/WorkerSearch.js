class WorkerSearch {
  constructor(query, queryStr) {
    (this.query = query), (this.queryStr = queryStr);
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          $or: [
            {
              username: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              address: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
              area: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
              gender: {
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
module.exports = WorkerSearch;
