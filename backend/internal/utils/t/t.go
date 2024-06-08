package t

import "time"

var BangkokTime *time.Location

func init() {
	BootTimeLocation()
}

func BootTimeLocation() {
	loc, err := time.LoadLocation("Asia/Bangkok")

	BangkokTime = loc

	if err != nil {
		panic(err)
	}
}

func TimeInBangkok(t time.Time) time.Time {
	return t.In(BangkokTime)
}

func TimeNow() time.Time {
	return time.Now().In(BangkokTime)
}

func TimeToday() time.Time {
	now := TimeNow()
	return time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, BangkokTime)
}

func CombineTime(d *time.Time, t *time.Time) *time.Time {
	if d == nil || t == nil {
		return nil
	}

	combined := time.Date(d.Year(), d.Month(), d.Day(), t.Hour(), t.Minute(), t.Second(), t.Nanosecond(), t.Location())
	return &combined
}

func ExtractTime(date *time.Time) (*time.Time, *time.Time) {
	if date == nil {
		return nil, nil
	}
	*date = date.In(BangkokTime)
	d := time.Date(date.Year(), date.Month(), date.Day(), 0, 0, 0, 0, date.Location())
	t := time.Date(1970, 1, 1, date.Hour(), date.Minute(), date.Second(), date.Nanosecond(), date.Location())
	return &d, &t
}
