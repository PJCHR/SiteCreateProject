import queryString from 'query-string';

export function getQueryString() {
    const result = queryString.parse(this.props.location.search);
    const rst = result.idx;

    return rst;
};