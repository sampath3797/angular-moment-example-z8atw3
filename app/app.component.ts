import { Component } from "@angular/core";
import moment from "moment";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  // following are input variables; presently passed hardcoded values
  calendarStartDate = moment("1/19/2017", "MM-DD-YYYY");
  calendarEndDate = moment("1/29/2017", "MM-DD-YYYY");
  users: string[] = ["A", "B", "C", "D", "E", "F"];
  userAppts: {
    user: string;
    fromDate: moment.Moment;
    toDate: moment.Moment;
    eventName: string;
  }[] = [
    {
      user: "A",
      fromDate: moment("1/20/2017", "MM-DD-YYYY"),
      toDate: moment("1/23/2017", "MM-DD-YYYY"),
      eventName: `planned leave from 20 Jan 2017 to 23 Jan 2017`
    },
    {
      user: "B",
      fromDate: moment("1/22/2017", "MM-DD-YYYY"),
      toDate: moment("1/23/2017", "MM-DD-YYYY"),
      eventName: "planned leave from"
    },
    {
      user: "A",
      fromDate: moment("1/25/2017", "MM-DD-YYYY"),
      toDate: moment("1/25/2017", "MM-DD-YYYY"),
      eventName: "planned leave from"
    },
    {
      user: "C",
      fromDate: moment("1/25/2017", "MM-DD-YYYY"),
      toDate: moment("1/26/2017", "MM-DD-YYYY"),
      eventName: "planned leave from"
    },
    {
      user: "D",
      fromDate: moment("1/19/2017", "MM-DD-YYYY"),
      toDate: moment("1/20/2017", "MM-DD-YYYY"),
      eventName: "planned leave from"
    },
    {
      user: "E",
      fromDate: moment("1/19/2017", "MM-DD-YYYY"),
      toDate: moment("1/21/2017", "MM-DD-YYYY"),
      eventName: "planned leave from"
    },
    {
      user: "F",
      fromDate: moment("1/27/2017", "MM-DD-YYYY"),
      toDate: moment("1/28/2017", "MM-DD-YYYY"),
      eventName: "planned leave from"
    }
  ];

  // following variables for generating scheduler
  dateArray: {
    user: string;
    dates: { date: moment.Moment; bgcolor: string; eventName: string }[];
  }[] = [];

  totalDatesArray: {
    date: moment.Moment;
    matched: number;
    matchedPercent: string;
  }[] = [];

  userAppt: { user: string; date: moment.Moment; eventName: string }[] = [];

  constructor() {
    // this.humanized = moment.duration(moment().diff(this.startDate)).humanize();
    // this.humanizedNow = moment.duration(moment().diff(moment())).humanize();

    // if you need to force to number of days
    // this.daysFrom2017 = this.currentDate.diff(moment("1/1/2017"), "days");

    // if you need to force to number of weeks
    // this.weeks = moment().diff(this.startDate, "week");

    this.userAppts.forEach((x, xIdx) => {
      for (
        let i = moment(x.fromDate);
        i.isSameOrBefore(x.toDate);
        i.add(1, "days")
      ) {
        this.userAppt.push({
          user: x.user,
          date: moment(i),
          eventName: x.eventName
        });
      }
    });

    // generating calendar dates Array from supplied start to end dates
    for (
      let i = this.calendarStartDate;
      i.isBefore(this.calendarEndDate);
      i.add(1, "days")
    ) {
      this.totalDatesArray.push({
        date: moment(i),
        matched: 0,
        matchedPercent: null
      });
    }

    // iterating each user and finding their appt dates to fill cell color
    this.users.forEach((usr, usrIdx) => {
      // generating userwise dates array with appts for iterating in html;
      this.dateArray.push({ user: usr, dates: [] });

      // iterating total calendar dates from start to end
      this.totalDatesArray.forEach((eachDate, dateIdx) => {
        let m = eachDate.date;

        //  filtering matched dates
        const isMatchedDate = this.userAppt.filter(
          x => x.user === usr && x.date.isSame(m)
        )[0];

        // pushing matched dates for color style and match count
        if (isMatchedDate) {
          const totalMatches = this.totalDatesArray.filter(x =>
            x.date.isSame(m)
          )[0];
          totalMatches.matched++;

          this.dateArray[usrIdx].dates.push({
            date: m,
            bgcolor: "blue",
            eventName: isMatchedDate.eventName
          });
        } // for no matching dates with out any cell color
        else {
          this.dateArray[usrIdx].dates.push({
            date: m,
            bgcolor: "white",
            eventName: ""
          });
        }
      });
    });
  }
}
