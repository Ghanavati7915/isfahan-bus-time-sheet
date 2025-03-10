import moment from 'moment-jalaali'

export const convertToJalaliTime = (dt: Date) => {
    let date = moment(dt)
    return date.format('HH:mm:ss')
}
export const convertToJalali = (dt: Date) => {
    let date = moment(dt)
    return date.format('HH:mm:ss jYYYY/jMM/jDD')
}

export const convertToJalaliRTL = (dt: string) => {
    let date = moment(dt)
    return date.format('jYYYY-jMM-jDD HH:mm')
}

export const convertToJalaliLTR = (dt: string) => {
    let date = moment(dt)
    return date.format('HH:mm jYYYY/jMM/jDD')
}

export const convertToJalaliDATE = (dt: string) => {
    let date = moment(dt)
    return date.format('jYYYY/jMM/jDD')
}
export const convertToJalaliDATEMinimal = (dt: string) => {
  let date = moment(dt)
  return date.format('jMM/jDD')
}
export const georgian_D_T_RTL = (dt: string) => {
    let date = moment(dt)
    return date.format('YYYY/MM/DD HH:mm')
}
export const georgian_D_T_LTR = (dt: string) => {
    let date = moment(dt)
    return date.format('HH:mm YYYY/MM/DD')
}
export const georgian_D = (dt: string) => {
    let date = moment(dt)
    return date.format('YYYY/MM/DD')
}

export const dateTimeFormat = (dt: string,format:string) => {
    let date = moment(dt)
    return date.format(format)
}

export const splitPrice = (data: number|null) => {
  if (data == null) return ''
  else return data.toLocaleString('fa-IR');
}

const convertToUTCWithOffset = (dateString: string, hoursOffset = 3, minutesOffset = 30) => {
    const date = new Date(dateString)
    // Add the offset
    date.setHours(date.getHours() + hoursOffset)
    date.setMinutes(date.getMinutes() + minutesOffset)

    // Convert to ISOString
    return date.toISOString()
}

export const getCurrentHour = () => {
    const currentDate = new Date()
    const formatDigit = (digit: number) => (digit < 10 ? '0' + digit : digit)

    const hour = formatDigit(currentDate.getHours())
    const minute = formatDigit(currentDate.getMinutes())
    const second = formatDigit(currentDate.getSeconds())

    return `${hour}:${minute}:${second}`
}


export const convertToHumanReadable = (_fromDate:any,_toDate:any) => {
    // تنظیم اولیه کتابخانه برای استفاده از تقویم شمسی
    moment.loadPersian({usePersianDigits: false});

// تبدیل تاریخ‌ها به شمسی
    let fromDate = moment(_fromDate);
    let toDate = moment(_toDate);

// استخراج اطلاعات روز، ماه و سال به شمسی
    let fromDay = fromDate.jDate();
    let fromMonth = fromDate.format('jMMMM'); // نام ماه به فارسی
    let fromYear = fromDate.jYear();

    let toDay = toDate.jDate();
    let toMonth = toDate.format('jMMMM'); // نام ماه به فارسی
    let toYear = toDate.jYear();

// محاسبه اختلاف روزها
    let diffDays = toDate.diff(fromDate, 'days');

// ساخت متن نهایی
    let result = `${fromDay} ${fromMonth} ${fromYear} لغایت ${toDay} ${toMonth} ${toYear} (${diffDays} روز)`;

    return result;
}



