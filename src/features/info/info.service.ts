import * as etlData from '@etl/etl.data'

export const getSections = async (userId: string, userRole: string): Promise<any> => {
  //P: verificar que tengan los permisos adecuados
  const sections = await etlData.getSectionsByUserId(userId, userRole)
  return sections
}
