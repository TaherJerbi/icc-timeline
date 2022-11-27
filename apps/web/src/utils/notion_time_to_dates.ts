const notion_time_re = /\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}-\d{2}:\d{2}/;

export default function notion_time_to_dates(time_string: string): {
  startTime: Date;
  endTime: Date;
} {
  if (notion_time_re.test(time_string)) {
    const [_, dd_mm_yyyy, start, end, __] = time_string.split(
      /(\d{2}\/\d{2}\/\d{4}) (\d{2}:\d{2})-(\d{2}:\d{2})/
    );
    const [dd, mm, yyyy] = dd_mm_yyyy.split("/");

    const startTime = new Date(
      +yyyy,
      +mm - 1,
      +dd,
      +start.split(":")[0],
      +start.split(":")[1]
    );

    const endTime = new Date(
      +yyyy,
      +mm - 1,
      +dd,
      +end.split(":")[0],
      +end.split(":")[1]
    );

    return {
      startTime,
      endTime,
    };
  }
  throw new Error(
    "INVALID FORMAT ${time_string}\nFormat : dd/mm/yyyy HH:MM-HH:MM"
  );
}
