interface Activity {
  activityId?: number
  description: string
  costHour: string
}

export interface ServiceData {
  description: string
  activities: Activity[]
}
