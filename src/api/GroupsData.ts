import { Group } from '@/types/groupalExpenses'
import { DB, loadData } from './Data'

const GROUPS_KEY = 'Groups'

const loadedGroups = loadData(GROUPS_KEY)

export var dataGroups: DB<Group> = {
    storageKey: GROUPS_KEY,
    id: loadedGroups.id,
    len: loadedGroups.len,
    data: loadedGroups.data
}
