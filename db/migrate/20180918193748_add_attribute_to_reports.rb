class AddAttributeToReports < ActiveRecord::Migration[5.2]
  def change
    add_column :reports, :recipient_id, :integer #quello che riceve la notifica
    add_column :reports, :actor_id, :integer     #l'utente che ha effettuato l'azione
    add_column :reports, :read_at, :datetime     #quando è stata effettuata la lettura
    add_column :reports, :action, :string        #l'azione intesa come commento, like, share,
    add_column :reports, :reportable_id, :integer # servono per l'associazione polimorfica
    add_column :reports, :reportable_type, :string #
    add_column :reports, :isSelected, :boolean
  end
end
