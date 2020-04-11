export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatQuestion (question, user, authedUser) {
  const { id, optionOne, optionTwo, timestamp } = question
  const { name, avatarURL } = user

  return {
    name,
    id,
    timestamp,
    optionOneText: optionOne.text,
    optionTwoText: optionTwo.text,
    avatarURL,
    optionOneVotes: optionOne.votes.length,
    optionTwoVotes: optionTwo.votes.length,
    hasAnswered: optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser),
    hasAnsweredOne: optionOne.votes.includes(authedUser),
    hasAnsweredTwo: optionTwo.votes.includes(authedUser)
  }
}

