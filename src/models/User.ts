export interface UserDatabaseModel {
    id: string,
    nickname: string,
    email: string,
    password: string
}

export interface PayloadModel {
    id: string,
    nickname: string,
    email: string,
    password: string
}

export class User {
    constructor(
        private id: string,
        private nickname: string,
        private email: string,
        private password: string
    ) { }

    public getId = (): string => {
        return this.id
    }

    public setId = (newId: string) => {
        this.id = newId
    }

    public getNickname = (): string => {
        return this.nickname
    }
    public setNickname = (newNickname: string) => {
        this.nickname = newNickname
    }
    public getPassword = (): string => {
        return this.password
    }
    public setPasswrod = (newPassword: string) => {
        this.password = newPassword
    }
    public getDatabaseModel = (): UserDatabaseModel => {
        return {
            id: this.id,
            nickname: this.nickname,
            email: this.email,
            password: this.password
        }
    }
}

