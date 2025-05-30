export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  fone: string;

  static fromEntity(user: any): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id;
    dto.name = user.name;
    dto.email = user.email;
    dto.fone = user.fone;
    return dto;
  }

  static fromEntities(users: any[]): UserResponseDto[] {
    return users.map(user => UserResponseDto.fromEntity(user));
  }
}