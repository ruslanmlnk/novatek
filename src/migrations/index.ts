import * as migration_20260719_090939_add_contact_form_background_image from './20260719_090939_add_contact_form_background_image'
import * as migration_20260826_122500_add_service_icon from './20260826_122500_add_service_icon'

export const migrations = [
  {
    up: migration_20260719_090939_add_contact_form_background_image.up,
    down: migration_20260719_090939_add_contact_form_background_image.down,
    name: '20260719_090939_add_contact_form_background_image',
  },
  {
    up: migration_20260826_122500_add_service_icon.up,
    down: migration_20260826_122500_add_service_icon.down,
    name: '20260826_122500_add_service_icon',
  },
]
