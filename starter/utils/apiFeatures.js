class ApiFeatures {
  constructor(mongooseQuery, queryParamsObj) {
    this.mongooseQuery = mongooseQuery;
    this.queryParamsObj = queryParamsObj;
  }

  filter() {
    const queryObj = { ...this.queryParamsObj };
    const excludedFields = ['sort', 'fields', 'limit', 'page'];
    excludedFields.forEach((field) => delete queryObj[field]);

    const queryString = JSON.stringify(queryObj).replace(
      /\bgte|gt|lte|lt/g,
      (match) => `$${match}`,
    );

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryString));

    return this;
  }

  sort() {
    if (this.queryParamsObj.sort) {
      const sortMethod = this.queryParamsObj.sort.split(',').join(' ');
      this.mongooseQuery = this.mongooseQuery.sort(sortMethod);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
    }

    return this;
  }

  fieldsProjecting() {
    if (this.queryParamsObj.fields) {
      const fields = this.queryParamsObj.fields.split(',').join(' ');
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select('-__v');
    }

    return this;
  }

  pagination() {
    const page = +this.queryParamsObj.page || 1;
    const limit = +this.queryParamsObj.limit || 10;
    const skip = (page - 1) * limit;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeatures;
