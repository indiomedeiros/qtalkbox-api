import { v4 } from 'uuid'

export default class IdGenerator {
    public generator = (): string => {
        return v4()
    }
}