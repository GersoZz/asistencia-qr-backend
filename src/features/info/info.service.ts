import * as etlData from '@etl/etl.data'
import * as infoData from '@info/info.data'

export const getSections = async (userId: string, userRole: string): Promise<any> => {
  //P: verificar que tengan los permisos adecuados
  const sections = await etlData.getSectionsByUserId(userId, userRole)
  return sections
}

export const getSessions = async (sectionId: string): Promise<any> => {
  //P: verificar que tengan los permisos adecuados
  const sections = await infoData.getSessionStatesBySection(sectionId)
  return sections
}

export const getStudentsOfSection = async (sectionId: string): Promise<any> => {
  //P: verificar que tengan los permisos adecuados
  const students = await infoData.getStudentsOfSection(sectionId)
  return students
}
