class AddAttributeToNotification < ActiveRecord::Migration[5.2]
  def change
    add_column :notifications, :recipient_id, :integer #quello che riceve la notifica
    add_column :notifications, :actor_id, :integer     #l'utente che ha effettuato l'azione
    add_column :notifications, :read_at, :datetime     #quando è stata effettuata la lettura
    add_column :notifications, :action, :string        #l'azione intesa come commento, like, share,
    add_column :notifications, :notifiable_id, :integer # servono per l'associazione polimorfica
    add_column :notifications, :notifiable_type, :string #
  end
end
