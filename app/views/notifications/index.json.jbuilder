json.array! @notifications do |notification|
  #notifiche delle domande
  #json.recipient notification.recipient
  json.id notification.id
  json.actor notification.actor.name
  json.action notification.action
  #json.notifiable notification.notifiable
  json.course_id notification.notifiable.course_id
  json.type "domanda"
end
