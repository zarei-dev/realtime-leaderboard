import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Game } from '../../games/entities/game.entity';

// Composite index on the two FK columns → makes the leaderboard rebuild fast query:
// SELECT "playerId", SUM(score) FROM matches WHERE "gameId" = ? GROUP BY "playerId"
@Index(['game', 'player'])
@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  player!: User;

  @ManyToOne(() => Game, { nullable: false, onDelete: 'CASCADE' })
  game!: Game;

  @Column({ type: 'int' })
  score!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
