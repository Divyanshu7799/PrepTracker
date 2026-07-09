const REVISION_INTERVALS_DAYS = [1, 3, 7, 16, 30];

function getNextRevision(currentStage = 0) {
  const index = Math.min(currentStage, REVISION_INTERVALS_DAYS.length - 1);
  const nextRevisionDate = new Date();
  nextRevisionDate.setDate(nextRevisionDate.getDate() + REVISION_INTERVALS_DAYS[index]);
  return { nextRevisionDate, nextStage: currentStage + 1 };
}

function toMySQLDate(date) {
  return date.toISOString().split("T")[0];
}

module.exports = { getNextRevision, toMySQLDate };
