module.exports = {
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()
        }`;
    },
    if_equal: (a, b, opts) => {
      if (a== b) {
        return opts.fn(this)
      }else {
        return opts.inverse(this)
      }
    }
  };


  