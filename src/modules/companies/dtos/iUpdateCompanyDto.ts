export interface IUpdateCompanyDto {
  id: string;
  corporateName?: string;
  fantasyName?: string;
  cnpj?: number;
  departamento?: string;
  contact?: number;
  email?: string;
  userOwnerId?: string;
  addressId?: string;
}
