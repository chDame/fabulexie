package org.fabulexie.rest.util;

import java.time.Duration;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public final class DateUtils {

    private DateUtils() {
    }

    public static Date asDate(LocalDate localDate) {
        return Date.from(localDate.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
    }

    public static int between(Date to, Date from) {
        LocalDate localTo = to.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate localFrom = from.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Period period = Period.between(localTo, localFrom);
        return period.getDays();
    }

    public static Date yesterday() {
        return asDate(LocalDate.now().minusDays(1));
    }

    public static Date getDateFromNow(int days) {
        return asDate(LocalDate.now().plusDays(days));
    }

    public static long getDaysFromNow(Date date) {
        LocalDate localeFirst = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return Duration.between(localeFirst.atStartOfDay(), LocalDate.now().atStartOfDay()).toDays();
    }

    public static List<Date> getAllDatesAfter(Date date, long daysToAdd) {
        List<Date> interval = new ArrayList<>();
        interval.add(date);
        LocalDate localeFirst = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        for (long i = 1; i <= daysToAdd; i++) {
            interval.add(asDate(localeFirst.plusDays(i)));
        }
        return interval;
    }

    public static Date nextDay(Date myDate) {
        LocalDate locale = myDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return asDate(locale.plusDays(1));
    }

    public static Date prevDay(Date myDate) {
        LocalDate locale = myDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return asDate(locale.plusDays(-1));
    }
}
