import 'reflect-metadata';
import { buildSchema, createAccountsCoreModule } from '@accounts/module-core';
import { createAccountsPasswordModule } from '@accounts/module-password';
import { AccountsPassword } from '@accounts/password';
import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm-config';
import { User } from './entities/user';
import { Email } from './entities/email';
import { createApplication, gql } from 'graphql-modules';
import AccountsServer, { AuthenticationServicesToken, ServerHooks } from '@accounts/server';
import { context, createAccountsMikroORMModule } from '@accounts/module-mikro-orm';
import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { useGraphQLModules } from '@envelop/graphql-modules';

void (async () => {
  const orm = await MikroORM.init(config);

  const typeDefs = gql`
    type PrivateType @auth {
      field: String
    }

    # Our custom fields to add to the user
    extend input CreateUserInput {
      firstName: String!
      lastName: String!
    }

    extend type User {
      firstName: String!
      lastName: String!
    }

    type Query {
      # Example of how to get the userId from the context and return the current logged in user or null
      me: User
      publicField: String
      # You can only query this if you are logged in
      privateField: String @auth
      privateType: PrivateType
    }

    type Mutation {
      _: String
    }
  `;

  // TODO: use resolvers typings from codegen
  const resolvers = {
    Query: {
      me: async (_, __, ctx) => {
        // ctx.userId will be set if user is logged in
        if (ctx.userId) {
          // We could have simply returned ctx.user instead
          return ctx.injector.get(AccountsServer).findUserById(ctx.userId);
        }
        return null;
      },
      publicField: () => 'public',
      privateField: () => 'private',
      privateType: () => ({
        field: () => 'private',
      }),
    },
  };

  const app = createApplication({
    modules: [
      createAccountsCoreModule({ tokenSecret: config.password }),
      createAccountsPasswordModule({
        // This option is called when a new user create an account
        // Inside we can apply our logic to validate the user fields
        // By default accounts-js only allow 'username', 'email' and 'password' for the user
        // In order to add custom fields you need to pass the validateNewUser function when you
        // instantiate the 'accounts-password' package
        validateNewUser: (user) => {
          // For example we can allow only some kind of emails
          if (user.email.endsWith('.xyz')) {
            throw new Error('Invalid email');
          }
          return user;
        },
      }),
      createAccountsMikroORMModule({
        UserEntity: User,
        EmailEntity: Email,
        // Provide EntityManager either via context or via Providers
        em: orm.em,
      }),
    ],
    providers: [
      {
        provide: AuthenticationServicesToken,
        useValue: { password: AccountsPassword },
        global: true,
      },
    ],
    schemaBuilder: buildSchema({ typeDefs, resolvers }),
  });

  const { injector, createOperationController } = app;

  injector.get(AccountsServer).on(ServerHooks.ValidateLogin, ({ user }) => {
    // This hook is called every time a user try to login.
    // You can use it to only allow users with verified email to login.
    // If you throw an error here it will be returned to the client.
    console.log(`${user.firstName} ${user.lastName} logged in`);
  });

  // Create a Yoga instance with a GraphQL schema.
  const yoga = createYoga({
    plugins: [useGraphQLModules(app)],
    context: (ctx) =>
      context(ctx, {
        createOperationController,
        // Provide EntityManager either via context or via Providers
        // ctx: { em: orm.em.fork() }
      }),
  });

  // Pass it into a server to hook into request handlers.
  const server = createServer(yoga);

  // Start the server and you're done!
  server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql');
  });

  try {
    const generator = orm.getSchemaGenerator();
    await generator.createSchema({ wrap: true });
  } catch {
    // Schema has already been created
  }
})();
